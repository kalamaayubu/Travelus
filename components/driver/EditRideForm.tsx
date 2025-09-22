"use client";

import { BookingStatusProps, Ride, SeatsByStatus, SeatsLayout } from "@/types";
import DriverSeatMap from "./DriverSeatMap";
import { useState } from "react";

type EditRideFormProps = {
  ride: Ride;
};

const EditRideForm = ({ ride }: EditRideFormProps) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // ✅ Ensure bookings is always an array
  const bookings = ride.bookings ?? [];

  // ✅ Compute seatsByStatus from bookings
  const seatsByStatus: SeatsByStatus = bookings.reduce(
    (acc: SeatsByStatus, booking: BookingStatusProps) => {
      const seats = booking.seatNumber.split(",").map((s) => s.trim());
      acc[booking.status] = [...acc[booking.status], ...seats];
      return acc;
    },
    {
      BOOKED: [],
      RESERVED: [],
      BLOCKED: [],
      CANCELLED: [],
      AVAILABLE: [],
    }
  );

  //   Parse seats layout
  const seatsLayout: SeatsLayout = {
    layout:
      ride.seatsLayout?.layout ??
      ride.vehicle_types?.seats_layout?.layout ?? // unwrap the inner 'layout'
      [],
  };

  // Seat selection handler
  const handleSeatSelect = (seatId: string) => {
    if (
      seatsByStatus.BOOKED.includes(seatId) ||
      seatsByStatus.RESERVED.includes(seatId)
    ) {
      return; // ❌ do nothing if seat is not free
    }

    setSelectedSeats(
      (prev) =>
        prev.includes(seatId)
          ? prev.filter((s) => s !== seatId) // remove if already selected
          : [...prev, seatId] // add if not selected
    );
  };

  //   Function to reserve a seat

  return (
    <>
      {/* show seat map if data exists */}
      <DriverSeatMap
        departureLocation={ride.departureLocation}
        destinationLocation={ride.destinationLocation}
        departureTime={ride.departureTime}
        seatsLayout={seatsLayout}
        seatsByStatus={seatsByStatus}
        selectedSeats={selectedSeats}
        onSeatSelect={(seatId) => handleSeatSelect(seatId)}
      />
    </>
  );
};

export default EditRideForm;
