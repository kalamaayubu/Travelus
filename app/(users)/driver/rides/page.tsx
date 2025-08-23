
import { fetchDriverRides } from '@/actions/driver.action';
import RideList from '@/components/driver/RideList';
import { Ride } from '@/types';
import Link from 'next/link';

export default async function DriverRidesPage() {
  const res = await fetchDriverRides();

  if (!res.success) {
    return <div className="text-red-500">Error: {res.error}</div>;
  }

  const rides: Ride[] = res.rides ?? [];
  console.log("Fetched rides:", rides);

  return (
    <>
      <div className='flex flex-col min-h-screen text-gray-300 p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14'>
        <div className='float-left'>
          <Link href="/driver/post-ride" className="primary-btn no-underline">
            Add a ride
          </Link>
        </div>

        <div className='mt-10'>
          <h1 className='text-2xl font-bold mb-4'>Your Rides</h1>
          <div className="flex justify-center">
          <div className="grid grid-cols-1 max-w-[12800px] md:grid-cols-2 xl:grid-cols-3 justify-items-center gap-8 xl:gap-6">
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
