
import { fetchDriverRides } from '@/actions/driver.action';
import AddRideButton from '@/components/driver/AddRideButton';
import RideList from '@/components/driver/RideList';
import { Ride } from '@/types';
import Image from 'next/image';

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
              <div className="flex flex-col items-center justify-center mt-8 p-10 bg-gray-800/80 rounded-lg text-center space-y-6">
              {/* Illustration */}
              <Image
                src="/assets/movingCarModal.svg" // You can replace with any SVG or PNG
                alt="No rides"
                width={200}
                height={200}
                className=""
              />

              <h2 className="text-2xl font-semibold text-white">
                No Rides Yet
              </h2>

              <p className="text-gray-400 max-w-xs">
                Looks like you haven't created any ride. Start posting your ride to let people join your journey!
              </p>
              <AddRideButton/>
              </div>
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
