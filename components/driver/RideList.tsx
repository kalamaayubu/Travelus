"use client";

import { Ride } from "@/types";
import RideCard from "./RideCard";
import { useState } from "react";
import AlertDialog from "../reusable/AlertDialog";

type RideListProps = {
  rides: Ride[];
};

export default function RideList({ rides }: RideListProps) {
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);
  const [showCancelRideDialog, setShowCancelRideDialog] = useState(false);

  
  const handleDeleteRide = (rideId: string) => () => {
    // Confirm before deleting
    setShowConfirmDeleteDialog(true);

  } 

  // Cancel ride function
  const handleCancelRide = (rideId: string) => () => {
    // Confirm before cancelling
    setShowCancelRideDialog(true);
  }
  return (
    <>
      {rides.map((ride) => {
        // Sum booked seats
        const bookedSeats = ride.bookings?.reduce((sum, booking) => sum + (booking.count || 0), 0) || 0;
        const vehicleCapacity = ride.vehicle_types?.capacity || 0;
        
        return (
          <RideCard
            key={ride.id}
            ride={
              {
                departureLocation: ride.departureLocation,
                destinationLocation: ride.destinationLocation,
                departureTime: ride.departureTime,
                vehicle: ride?.vehicle_types?.type_name || "Unspecified Vehicle",
                pricePerSeat: ride.pricePerSeat,
                remainingSeats: vehicleCapacity - bookedSeats,
                status: ride.status || "Active",
              }
            }
            onEdit={() => console.log("Edit ride", ride.id)}
            onCancel={handleCancelRide(ride.id!)}
            onDelete={handleDeleteRide(ride.id!)}
          />
        )
        // <RideCard
        //   key={ride.id}
        //   ride={
        //     {
        //       departureLocation: ride.departureLocation,
        //       destinationLocation: ride.destinationLocation,
        //       departureTime: ride.departureTime,
        //       vehicle: ride?.vehicle_types?.type_name || "Unspecified Vehicle",
        //       pricePerSeat: ride.pricePerSeat,
        //       remainingSeats: vehicleCapacity - bookedSeats,
        //       status: ride.status || "Active",
        //     }
        //   }
        //   onEdit={() => console.log("Edit ride", ride.id)}
        //   onCancel={handleCancelRide(ride.id!)}
        //   onDelete={handleDeleteRide(ride.id!)}
        // />
      })}

      {/* Confirm delete dialog */}
      <AlertDialog
        title="Delete Ride?"
        open={showConfirmDeleteDialog}
        onOpenChange={setShowConfirmDeleteDialog}
        description="⚠️ Are you sure you want to delete this ride? This action cannot be undone."
        actions={[
          {
            label: "Cancel",
            variant: "secondary",
            onClick: () => setShowConfirmDeleteDialog(false),
          },
          {
            label: "Delete",
            variant: "destructive",
            onClick: () => {
              console.log("Ride deleted");
            }
          }
        ]}
      />

      {/* Confirm ride cancelling */}
      <AlertDialog
        title="Cancel Ride?"
        open={showCancelRideDialog}
        onOpenChange={setShowCancelRideDialog}
        
        description="⚠️ Are you sure you want to cancel this ride? This will make your ride invisible to passangers."
        actions={[
          {
            label: "Keep Active",
            variant: "secondary",
            onClick: () => setShowCancelRideDialog(false),
          },
          {
            label: "Cancel Ride",
            variant: "destructive",
            onClick: () => {
              console.log("Ride cancelled");
            }
          }
        ]}
      />
    </>
  );
}
