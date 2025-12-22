import { getPublicRides } from "@/actions/rider.action";
import AvailableRidesList from "@/components/AvailableRidesList";
import dayjs from "dayjs";

export const revalidate = 0;

interface AvailableRidesSectionProps {
  showHeading?: boolean;
}

export default async function AvailableRidesSection({
  showHeading = true,
}: AvailableRidesSectionProps) {
  const rides = await getPublicRides();

  const formattedRides =
    rides?.map((ride) => ({
      ...ride,
      departureTime: dayjs(ride.departureTime).format("DD/MM/YYYY, hh:mm A"),
    })) || [];

  return (
    <AvailableRidesList rides={formattedRides} showHeading={showHeading} />
  );
}
