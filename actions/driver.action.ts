'use server'

import { createClient } from "@/lib/supabase/server";
import { PostRideFormData } from "@/types";
import { getUser } from "@/utils/getUser";

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
            seatsAvailable: data.seatsAvailable,
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