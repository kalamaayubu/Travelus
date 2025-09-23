"use client";

import {
  BookingStatusProps,
  DriverSeatReservationProps,
  Ride,
  SeatsByStatus,
  SeatsLayout,
} from "@/types";
import DriverSeatMap from "./DriverSeatMap";
import { useState } from "react";
import { lockSeats } from "@/actions/driver.action";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useParams } from "next/navigation";

type EditRideFormProps = {
  ride: Ride;
};

const EditRideForm = ({ ride }: EditRideFormProps) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const { user } = useSelector((state: RootState) => state.auth);
  const [isReserving, setIsReserving] = useState(false);
  const params = useParams();

  // ✅ Ensure bookings is always an array
  const bookings = ride.bookings ?? [];
  console.log("BOOKINGS FROM EDIT FORM:", bookings);

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

  //   Function to reserve seats
  const reserveSeats = async () => {
    setIsReserving(true);
    if (!params?.rideId || !user?.id || selectedSeats.length === 0) return;

    // Seat reservation data
    const payload: DriverSeatReservationProps = {
      rideId:
        typeof params.rideId === "string" ? params.rideId : params.rideId[0],
      count: selectedSeats.length,
      seatNumber: selectedSeats,
      userId: user.id,
      userType: "driver",
      status: "BLOCKED",
    };
    console.log("PAYLOAD:", payload);
    const res = await lockSeats(payload);

    if (!res.success) {
      setIsReserving(false);
      toast.error("Failed to reserve. Please try again later");
      return;
    }

    setIsReserving(false);
    window.location.reload();
    toast.success("Seats reserved successfully");
  };

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
        onReserveSeats={reserveSeats}
        isReserving={isReserving}
      />
    </>
  );
};

export default EditRideForm;
