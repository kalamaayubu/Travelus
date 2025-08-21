'use server'

import { createClient } from "@/lib/supabase/server";

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
                id,
                type_name,
                capacity,
                seats_layout
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

    return transformedData || [];
}