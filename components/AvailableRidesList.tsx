'use client';

import { AvailableRidesListProps, RideFilterForm } from "@/types";
import PublicRideCard from "./PublicRideCard";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { CarFront } from "lucide-react";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat"
dayjs.extend(customParseFormat)


export default function AvailableRidesList({ rides }: AvailableRidesListProps) {
  const router = useRouter();

  // RHF setup
  const { register, watch, reset } = useForm<RideFilterForm>({
    defaultValues: {
      search: "",
      vehicle: "",
      maxPrice: "",
      date: "",
    },
  });

  // Watch for values (reactively uptates filters)
  const { search, vehicle, maxPrice, date } = watch()

  // Filtering logic
  const filteredRides = rides.filter((ride) => {
    const matchesSearch = 
      !search || 
      ride.departureLocation.toLowerCase().includes(search.toLowerCase()) ||
      ride.destinationLocation.toLowerCase().includes(search.toLowerCase());

    const matchesVehicle = 
      !vehicle ||
      (ride.vehicle && ride.vehicle.toLowerCase().includes(vehicle.toLowerCase()))

    const matchesPrice = 
      !maxPrice || ride.pricePerSeat <= Number(maxPrice);

    const matchesDate =
      !date || dayjs(ride.departureTime, "DD/MM/YYYY, hh:mm A").format("YYYY-MM-D") === date

    return matchesSearch && matchesVehicle && matchesPrice && matchesDate;
  })

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
      <div className="space-y-6 p-8 relative">
        <h2 className="text-xl md:text-2xl font-bold backdrop-blur-3xl z-30 text-gray-50">Available Rides</h2>

        {/* Ride filtering form */}
        <form className="grid md:grid-cols-4 gap-4 bg-gray-900 p-4 rounded-lg backdrop:blur-xl sticky top-0 z-20">
          <input
            type="text"
            placeholder="Search location (departure or destination)"
            {...register("search")}
            className="p-2 rounded-md bg-gray-800 text-white"
          />

          <input
            type="text"
            placeholder="Vehicle type (e.g shuttle, bus, car, etc)"
            {...register("vehicle")}
            className="p-2 rounded-md bg-gray-800 text-white"
          />

          <input
            type="number"
            placeholder="Max price"
            {...register("maxPrice")}
            className="p-2 rounded-md bg-gray-800 text-white"
          />

          <input
            type="date"
            {...register("date")}
            className="p-2 rounded-md bg-gray-800 text-white"
          />
        </form>

        {/* Rides list Grid */}
        {filteredRides.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center text-gray-400">
            {/* Fun Illustration / Icon */}
            <div className="bg-gray-800/40 p-6 rounded-full">
              <CarFront className="w-12 h-12"/>
            </div>

            {/* Friendly Message */}
            <h3 className="text-lg sm:text-xl xl:text-2xl font-semibold text-gray-200">
              No rides match your filter
            </h3>
            <p className="text-gray-400 text-sm mt-2 max-w-sm">
              Try adjusting your search criteria or explore other available rides.
            </p>

            {/* Action Buttons */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => reset()}
                className="rounded-sm"
              >
                Reset Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredRides.map((ride) => (
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
        )}
      </div>
    </>
  );
}
