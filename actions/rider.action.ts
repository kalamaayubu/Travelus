'use server'

import { createClient } from "@/lib/supabase/server";
import { RideDetailsProps } from "@/types";

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
                seatNumber
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


// Book selected seats