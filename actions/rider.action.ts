'use server'

import { createClient } from "@/lib/supabase/server";
import { BookingInfoProps, RideDetailsProps } from "@/types";
import { revalidatePath } from "next/cache";

export async function getPublicRides() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("ride_posts")
        .select(`
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
        `)
        .order('departureTime', { ascending: true })
        .eq("status", "Active");

    if (error) {
        console.error("Error fetching available rides:", error.message);
        return [];
    }

    const transformedData = data?.map(ride => {
        // Sum the 'count' column from all bookings
        const bookedSeats = ride.bookings?.reduce(
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
            status: ride.status
        }
    })

    // console.log('available seats', transformedData.availableSeats)
    return transformedData || [];
}


// Ride details fetching function 
export async function getRideDetails(rideId: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("ride_posts")
        .select(`
            id,
            createdBy,
            departureLocation,
            destinationLocation,
            departureTime,
            pricePerSeat,
            status,
            vehicle_types (
                id,
                type_name,
                capacity,
                seats_layout
            ),
            bookings (
                id,
                count,
                seatNumber,
                status
            )
        `)
        .eq("id", rideId)
        .single();

    if (error) {
        console.error("Error fetching ride details:", error.message);
        return null;
    }

    if (!data) return null;

     // calculate booked & available seats
  const bookedSeats =
    data.bookings?.reduce(
      (total, booking) => total + (booking.count || 0),
      0
    ) || 0;

  const vehicleCapacity = data.vehicle_types?.[0]?.capacity || 0;
  const availableSeats = vehicleCapacity - bookedSeats;

  // transform object
  const transformedData = {
    id: data.id || "",
    createdBy: data.createdBy,
    departureLocation: data.departureLocation,
    destinationLocation: data.destinationLocation,
    departureTime: data.departureTime,
    pricePerSeat: data.pricePerSeat,
    vehicle: data.vehicle_types,
    availableSeats: availableSeats > 0 ? availableSeats : 0,
    status: data.status,
    bookings: data.bookings || []
  };

  console.log('BOOKINGS:', transformedData.bookings)
//   console.log('RideDetailsData:', transformedData)
//   console.log('VEHICLE', transformedData.vehicle)
//   console.log('SEAT LAYOUT:', transformedData.vehicle.seats_layout)
//   console.log('LAYOUT:', transformedData.vehicle.seats_layout.layout)
  return transformedData;
}


// Collect passanger's phone number(to be used for payments)
export async function reserveSeats(data: BookingInfoProps) {
    
    console.log('PHONE:', data.passangerPhone)
    console.log('User:', data.passangerId)
    console.log('BookingInfo:', data)

    const supabase = await createClient()

    const { error } = await supabase
        .from('profiles')
        .update({
            phone: data.passangerPhone,
            booking_info: data
        })
        .eq('id', data.passangerId)

    if (error) {
        console.log('Error recording phone number:', error.message)

        // 🛑 Catch the specific constraint violation
        // if (error.message.includes(
        //     'insert or update on table "bookings" violates foreign key constraint "bookings_rider_fkey'
        // )) {
        //     return {
        //         success: false,
        //         error:
        //         "You are not logged in as a passenger. Log in with a passenger account to continue.",
        //     };
        // }

        return { success: false, error: error.message }
    }

    // ✅ Revalidate paths affected by this booking
    revalidatePath('/available-rides');                        // available rides list
    revalidatePath(`/rides/${data.rideId}`);    // ride details page (dynamic)

    return { success: true, message: 'Phone number recorder successfully.'}
}