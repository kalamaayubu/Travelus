'use client';

import { AvailableRidesListProps } from "@/types";
import PublicRideCard from "./PublicRideCard";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function AvailableRidesList({ rides }: AvailableRidesListProps) {
  const router = useRouter();

  if (!rides || rides.length === 0) {
    return (
      <div className="text-gray-400 m-auto flex flex-col gap-4 items-center justify-center p-8 h-svh">
        <p className="sm:text-xl md:text-2xl lg:text-3xl text-center">No rides available at the moment.</p>
        <Link href={'/'} className="primary-btn">
          Go home
        </Link>
      </div>
    ) 
  }

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
              onViewDetails={() => router.push(`/available-rides/${ride.id}`)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
