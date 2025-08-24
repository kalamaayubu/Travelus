'use client';

import { AvailableRidesListProps } from "@/types";
import PublicRideCard from "./PublicRideCard";
import ReusableDialog from "./reusable/dialog";
// import { useState } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";


export default function AvailableRidesList({ rides }: AvailableRidesListProps) {
  const router = useRouter();

  if (!rides || rides.length === 0) {
    return <p className="text-gray-400 p-8">No rides available at the moment.</p>;
  }


  // Redirect to ride details page
  const handleViewDetails = async (rideId: string) => {
    router.push(`/available-rides/${rideId}`);
  };

  return (
    <>
      <div className="space-y-6 p-8">
        <h2 className="text-2xl font-bold text-gray-100">Available Rides</h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rides.map((ride) => (
            <PublicRideCard
              key={ride.id}
              departure={ride.departureLocation}
              destination={ride.destinationLocation}
              date={ride.departureTime}
              vehicle={ride.vehicle || "Unspecified Vehicle"}
              availableSeats={ride.availableSeats}
              price={ride.pricePerSeat}
              onViewDetails={() => handleViewDetails(ride.id)}
            />
          ))}
        </div>
      </div>

      {/* ReusableDialog for login */}
      {/* <ReusableDialog
        open={showLoginDialog}
        onOpenChange={setShowLoginDialog}
        closable={false}
        contentClassName="bg-gray-900 border-1 border-gray-800"
      >
        <button onClick={() => setShowLoginDialog(false)} className="relative mx-auto justify-center p-10 flex flex-col cursor-pointer opacity-80 items-center bg-gray-800 hover:opacity-100 hover:border hover:border-gray-600 rounded-full">
          <X className="font-bold text-red-600 opacity-100"/>
        </button>
        <p className="text-center text-xl font-bold">Login Required</p>
        <p className="text-sm text-center text-gray-400">
          Please log in to continue with your booking.
        </p>
        <button className="primary-btn py-5 mt-4" onClick={() => (window.location.href = '/auth/login')}>
            Login
          </button>
      </ReusableDialog> */}
    </>
  );
}
