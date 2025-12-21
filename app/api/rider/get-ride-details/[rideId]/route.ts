import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { rideId: string } }
) {
  const supabase = await createClient();
  const { rideId } = await params;

  const { data, error } = await supabase
    .from("ride_posts")
    .select(
      `
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
      `
    )
    .eq("id", rideId)
    .single();

  if (error) {
    console.error("Error fetching ride details:", error.message);
    return NextResponse.json(null);
  }

  if (!data) return NextResponse.json(null);

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
    bookings: data.bookings || [],
  };

  console.log("BOOKINGS:", transformedData.bookings);

  return NextResponse.json(transformedData);
}
