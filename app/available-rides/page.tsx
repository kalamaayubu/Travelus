// app/available-rides/page.tsx
import { getPublicRides } from "@/actions/rider.action";
import AvailableRidesList from "@/components/AvailableRidesList";
import dayjs from "dayjs";

export const revalidate = 0; // disables caching completely

export default async function AvailableRidesPage() {
  // Fetch available rides from the server
  const rides = await getPublicRides();

    // Pre-format departureTime so the client just gets a string
  const formattedRides = rides?.map((ride) => ({
    ...ride,
    departureTime: dayjs(ride.departureTime).format("DD/MM/YYYY, hh:mm A"),
  })) || [];

  console.log("Formatted rides:", formattedRides);

  return (
    <div className="flex flex-col">
      <AvailableRidesList rides={formattedRides} />
    </div>
  );
}
