
import { fetchDriverRides } from '@/actions/driver.action';
import RideList from '@/components/driver/RideList';
import { Ride } from '@/types';

export default async function DriverRidesPage() {
  const res = await fetchDriverRides();

  if (!res.success) {
    return <div className="text-red-500">Error: {res.error}</div>;
  }

  const rides: Ride[] = res.rides ?? [];

  return (
    <>
      <div className='flex flex-col min-h-screen text-gray-300 pb-44 md:pb-0'>
        <div className=''>
          <div className="flex justify-center md:justify-start">
          <div className="grid grid-cols-1 max-w-[12800px] md:grid-cols-2 xl:grid-cols-3 justify-items-center gap-7 xl:gap-6">
            {rides?.length === 0 ? (
              <p className="text-gray-400">You haven’t posted any rides yet.</p>
            ) : (
              <RideList rides={rides} />
            )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
