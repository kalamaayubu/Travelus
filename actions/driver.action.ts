"use server";

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
    .from("ride_posts")
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
    .from("ride_posts")
    .select(
      `
            id, 
            departureTime, 
            departureLocation, 
            destinationLocation, 
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
    .eq("createdBy", user.id);

  if (error) {
    console.error("Error fetching rides:", error);
    return { success: false, error: error.message };
  }

  console.log("DRIVER RIDES DATA:", rides);
  return { success: true, rides };
}

// Function to fetch vehicle types
export async function getVehicleTypes() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("vehicle_types")
    .select("id, type_name");

  if (error) {
    console.log("Error fetching vehicle types:", error.message);
    return [];
  }

  console.log("Vehicle types fetched:", data);
  return data;
}

// Function to get ride details by ID
export async function getRideById(rideId: string) {
  const supabase = await createClient();
  if (!rideId) {
    return { success: false, error: "Ride ID is required" };
  }
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
                id,
                type_name,
                capacity
            )
        `
    )
    .eq("id", rideId)
    .single();

  if (error) {
    console.error("Error fetching ride by ID:", error);
    return { success: false, error: error.message };
  }

  console.log("Ride details fetched:", data);
  return { success: true, data };
}

// Function to delete a ride by ID
export async function deleteRide(rideId: string, userId: string) {
  const supabase = await createClient();

  if (!userId) {
    return { success: false, error: "Ride ID is required" };
  }

  const { data, error } = await supabase
    .from("ride_posts")
    .delete()
    .eq("id", rideId)
    .eq("createdBy", userId); // Ensure the user can only delete their own
  if (error) {
    console.error("Error deleting ride:", error);
    return { success: false, error: error.message };
  }

  console.log("Ride deleted successfully:", data);
  return { success: true, message: "Ride deleted successfully" };
}

// Fetch ride layout
export async function getRideData(rideId: string) {
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
    vehicle_types (
        id, 
        type_name, 
        capacity, 
        seats_layout
    ),
    status,
    bookings(
        id, 
        seatNumber, 
        status, 
        count
    )
  `
    )
    .eq("id", rideId);

  if (error) {
    console.log("Error getting seats layout:", error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}
