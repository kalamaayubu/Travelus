// Purpose: Define AI tools for the assistant to use in performing operations.
"use server";

import { createClient } from "@/lib/supabase/server";

export const AITools = {
  async searchRides(origin: string, destination: string) {
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
      .ilike("departureLocation", `%${origin}%`)
      .ilike("destinationLocation", `%${destination}%`)
      .eq("status", "Active")
      .order("departureTime", { ascending: true });

    if (error) {
      console.error("Error searching rides:", error.message);
      return { success: false, error: error.message };
    }

    const transformedData = data?.map((ride) => {
      const bookedSeats =
        ride.bookings?.reduce((total, b) => total + (b.count || 0), 0) || 0;
      const vehicleCapacity = ride.vehicle_types?.capacity || 0;
      const availableSeats = vehicleCapacity - bookedSeats;

      return {
        id: ride.id,
        departureLocation: ride.departureLocation,
        destinationLocation: ride.destinationLocation,
        departureTime: ride.departureTime,
        vehicle: ride.vehicle_types?.type_name,
        pricePerSeat: ride.pricePerSeat,
        availableSeats: availableSeats > 0 ? availableSeats : 0,
        status: ride.status,
      };
    });

    return { success: true, rides: transformedData };
  },

  navigateTo(page: string) {
    return { action: "navigate", page };
  },
};
