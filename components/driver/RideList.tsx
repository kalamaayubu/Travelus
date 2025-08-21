// RideList.tsx
"use client";

import { Ride } from "@/types";
import RideCard from "./RideCard";

type RideListProps = {
  rides: Ride[];
};

export default function RideList({ rides }: RideListProps) {
  return (
    <>
      {rides.map((ride) => (
        <RideCard
          key={ride.id}
          ride={
            {
              departureLocation: ride.departureLocation,
              destinationLocation: ride.destinationLocation,
              departureTime: ride.departureTime,
              vehicle: ride.vehicle || "Unspecified Vehicle",
              pricePerSeat: ride.pricePerSeat,
              status: ride.status || "Active",
            }
          }
          onEdit={() => console.log("Edit ride", ride.id)}
          onCancel={() => console.log("Cancel ride", ride.id)}
        />
      ))}
    </>
  );
}
