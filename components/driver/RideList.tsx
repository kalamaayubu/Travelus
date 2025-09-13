"use client";

import { Ride } from "@/types";
import RideCard from "./RideCard";
import { useState } from "react";
import AlertDialog from "../reusable/AlertDialog";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { deleteRide } from "@/actions/driver.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

type RideListProps = {
  rides: Ride[];
};

export default function RideList({ rides }: RideListProps) {
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);
  const [showCancelRideDialog, setShowCancelRideDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [rideToDelete, setRideToDelete] = useState<string | null>(null);

  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const router = useRouter()

  // Handle ride deletion
  const handleDeleteRide = (rideId: string) => async () => {
    setIsDeleting(true);

    try {
      const res = await deleteRide(rideId, userId!);

      if (!res.success) {
        console.error("Error deleting ride:", res.error);
        toast.error("Failed to delete ride. Please try again.");
        return;
      }

      toast.success("Ride deleted successfully");
      setShowConfirmDeleteDialog(false);

      // Refresh page or filter out ride locally
      window.location.reload();
    } catch (error) {
      console.error("Error deleting ride:", error);
      toast.error("Failed to delete ride. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle ride cancellation
  const handleCancelRide = (rideId: string) => () => {
    setShowCancelRideDialog(true);
  };

  return (
    <>
      {rides.map((ride) => {
        const bookedSeats =
          ride.bookings?.reduce(
            (sum, booking) => sum + (booking.count || 0),
            0
          ) || 0;

        const vehicleCapacity = ride.vehicle_types?.capacity || 0;

        return (
          <RideCard
            key={ride.id}
            ride={{
              departureLocation: ride.departureLocation,
              destinationLocation: ride.destinationLocation,
              departureTime: ride.departureTime,
              vehicle: ride?.vehicle_types?.type_name || "Unspecified Vehicle",
              pricePerSeat: ride.pricePerSeat,
              remainingSeats: vehicleCapacity - bookedSeats,
              status: ride.status || "Active",
            }}
            onEdit={() => router.push(`/driver/rides/${ride.id}/edit`)}
            onCancel={handleCancelRide(ride.id!)}
            onDelete={
              bookedSeats === 0
                ? () => {
                    setRideToDelete(ride.id!);
                    setShowConfirmDeleteDialog(true);
                  }
                : undefined
            }
          />
        );
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
            label: isDeleting ? <span className="flex items-center justify-center gap-2"><Loader2 className="w-4 animate-spin"/> Deleting...</span> : "Delete",
            variant: "destructive",
            onClick: () => {
              if (rideToDelete) {
                handleDeleteRide(rideToDelete)();
              }
            },
          },
        ]}
      />

      {/* Confirm ride cancelling */}
      <AlertDialog
        title="Cancel Ride?"
        open={showCancelRideDialog}
        onOpenChange={setShowCancelRideDialog}
        description="⚠️ Are you sure you want to cancel this ride? This will make your ride invisible to passengers."
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
            },
          },
        ]}
      />
    </>
  );
}
