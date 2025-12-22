import { Suspense } from "react";
import RideDetailsClient from "./RideDetailsClient";
import RideDetailsLoading from "./loading";
import { getRideDetails } from "@/actions/rider.action";

export default async function RideDetailsPage({
  params,
}: {
  params: Promise<{ rideId: string }>;
}) {
  const { rideId } = await params;
  const ride = await getRideDetails(rideId);

  return (
    <Suspense fallback={<RideDetailsLoading />}>
      <RideDetailsClient initialRide={ride} />
    </Suspense>
  );
}
