'use server'

import { createClient } from "@/lib/supabase/server";
import { PostRideFormData } from "@/types";
import { getUser } from "@/utils/getServerUser";

// This function handles the logic for posting a ride
export async function postRide(data: PostRideFormData) {
    const supabase = await createClient();

    // Get the current user
    const user = await getUser();
    if (!user) {
        return { success: false, error: "User not authenticated" };
    }

    const { data: ridePostData, error } = await supabase
        .from('ride_posts')
        .insert({
            departureLocation: data.departureLocation,
            destinationLocation: data.destinationLocation,
            vehicleType: data.vehicleType,
            pricePerSeat: data.pricePerSeat,
            departureTime: data.departureTime,
            createdBy: user.id,
        })
        .select()
        .single();

    if (error) {
        console.error("Error inserting ride post:", error);
        return { success: false, error: error.message };
    }

    console.log("Ride post created successfully:", ridePostData);
    return { success: true, message: "Ride post created successfully" };
}

// Fetch a driver's rides
export async function fetchDriverRides() {
    const supabase = await createClient();
    const user = await getUser();

    if (!user) {
        return { success: false, error: "User not authenticated" };
    }

    const { data: rides, error } = await supabase
        .from('ride_posts')
        .select(`
            id, departureTime, departureLocation, 
            destinationLocation, pricePerSeat, status,
            vehicle_types (
                type_name
            )
        `)
        .eq('createdBy', user.id);

    if (error) {
        console.error("Error fetching rides:", error);
        return { success: false, error: error.message };
    }

    console.log('DRIVER RIDES DATA:', rides)
    return { success: true, rides };
}


// Function to fetch vehicle types
export async function getVehicleTypes() {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('vehicle_types')
        .select('id, type_name')

    if (error) {
        console.log('Error fetching vehicle types:', error.message)
        return []
    }

    console.log('Vehicle types fetched:', data)
    return data
}