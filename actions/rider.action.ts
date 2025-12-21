"use server";

import { sendNotification } from "@/lib/firebase/sendNotification";
import { createClient } from "@/lib/supabase/server";
import { BookingInfoProps, RideDetailsProps } from "@/types";
import { revalidatePath } from "next/cache";

export async function getPublicRides() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("ride_posts")
    .select(
      `
            id,
            departureLocation,
            destinationLocation,
            departureTime,
            pricePerSeat,
            status,
            vehicle_types (
                type_name,
                capacity
            ),
            bookings (
                count
            )
        `
    )
    .order("departureTime", { ascending: true })
    .eq("status", "Active");

  if (error) {
    console.error("Error fetching available rides:", error.message);
    return [];
  }

  const transformedData = data?.map((ride) => {
    // Sum the 'count' column from all bookings
    const bookedSeats =
      ride.bookings?.reduce(
        (total, booking) => total + (booking.count || 0),
        0
      ) || 0;

    const vehicleCapacity = ride.vehicle_types?.capacity || 0;
    const availableSeats = vehicleCapacity - bookedSeats;

    return {
      id: ride.id || "",
      departureLocation: ride.departureLocation,
      destinationLocation: ride.destinationLocation,
      departureTime: ride.departureTime,
      pricePerSeat: ride.pricePerSeat,
      vehicle: ride.vehicle_types?.type_name,
      availableSeats: availableSeats > 0 ? availableSeats : 0, // Ensure non-negative
      status: ride.status,
    };
  });

  // console.log('available seats', transformedData.availableSeats)
  return transformedData || [];
}

// Collect passanger's phone number(to be used for payments)
export async function reserveSeats(data: BookingInfoProps) {
  console.log("PHONE:", data.passangerPhone);
  console.log("User:", data.passangerId);
  console.log("BookingInfo:", data);

  const supabase = await createClient();

  // 1️⃣ Create booking (RESERVED)
  const { data: booking, error: bookingError } = await supabase
    .from("bookings")
    .insert({
      user_id: data.passangerId,
      ride: data.rideId,
      count: data.selectedSeats.length,
      seatNumber: data.selectedSeats.join(","),
      status: "RESERVED",
      user_type: "rider",
      reserved_at: new Date().toISOString(),
    })
    .select("id")
    .single();

  if (bookingError || !booking) {
    console.error("Booking creation failed:", bookingError);
    return { success: false, error: bookingError?.message };
  }

  const bookingId = booking.id;

  // 2️⃣ Save phone number (profile update)
  const { error: profileError } = await supabase
    .from("profiles")
    .update({
      phone: data.passangerPhone,
    })
    .eq("id", data.passangerId);

  if (profileError) {
    console.error("Profile update failed:", profileError);
    return { success: false, error: profileError.message };
  }

  // Get the user's fcm_token for notification
  // const { data: fcmUserData, error: fcmUserError } = await supabase
  //   .from("notification_subscriptions")
  //   .select("fcm_token");
  // // .eq('user', userId)

  // if (fcmUserError) {
  //   console.error("Error FCM userData", fcmUserError);
  //   return;
  // }

  // // Send the notification
  // await sendNotification({
  //   title: "Booked successful",
  //   body: "Congratulations, you  have successfully booked a seat with Travelus. Stay in tune with your schedule. Haev a blessed journey",
  //   recipients: fcmUserData?.fcm_token,
  // });

  // ✅ Revalidate paths affected by booking
  revalidatePath("/available-rides"); // available rides page
  revalidatePath(`/rides/${data.rideId}`); // ride details page (dynamic)
  revalidatePath("/my-bookings");

  // ✅ RETURN bookingId (THIS is the important part)
  return {
    success: true,
    bookingId,
  };
}

// Get my bookings
export async function getMyBookings(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("bookings")
    .select(
      `
        id, 
        ride,
        reserved_at,
        status,
        count,
        ride (
          departureLocation,
          destinationLocation,
          departureTime,
          pricePerSeat
        )
    `
    )
    .eq("user_id", userId)
    .order("reserved_at", { ascending: false });

  if (error) {
    console.error("Error fetching my bookings:", error.message);
    return [];
  }

  return data || [];
}

// Complete booking (mark as completed)
export async function completeBooking(bookingId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("bookings")
    .update({
      status: "COMPLETED",
    })
    .eq("id", bookingId)
    .select();

  if (error) {
    console.error("Complete booking error:", error);
    return null;
  }

  console.log("Completed booking:", data);
  return data;
}

/**
 * Simulate booking payment confirmation
 * Marks the booking as BOOKED
 */
export async function seatBooked(bookingId: string) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("bookings")
      .update({ status: "BOOKED" })
      .eq("id", bookingId)
      .select();

    if (error) {
      console.error("Error updating booking to BOOKED:", error);
      return { success: false, error };
    }

    console.log("Booking marked as BOOKED:", data);

    return { success: true, data };
  } catch (err) {
    console.error("seatBooked error:", err);
    return { success: false, error: err };
  }
}
