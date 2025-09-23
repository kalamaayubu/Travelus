import { getRideData } from "@/actions/driver.action";
import EditRideForm from "@/components/driver/EditRideForm";

export default async function RideEditingPage({
  params,
}: {
  params: { rideId: string };
}) {
  const { rideId } = await params;

  // Fetch ride data
  const res = await getRideData(rideId);

  if (!res || !res.data || res.data.length === 0) {
    return <div>Ride not found</div>;
  }

  return <EditRideForm ride={res.data[0]} />;
}
