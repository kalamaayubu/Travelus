'use client';

import Logo from '@/components/Logo';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DriverRidesPage() {
  const router = useRouter()
  return (
    <>
      <div className='flex flex-col min-h-screen text-gray-300 p-6'>
        <div className='float-left'>
          <button onClick={() => router.push('/driver/post-ride')}>Add a ride</button>
        </div>
      </div>
    </>
  );
}
