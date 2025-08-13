'use client';

import Logo from '@/components/Logo';

export default function AvailableRidesPage() {
  return (
    <div className="min-h-screen text-gray-300 flex items-center justify-center p-4">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <Logo />
        <h1 className="text-2xl font-bold mt-4 text-white">Available Rides</h1>
        <p className="text-gray-400 mt-2">Browse and select from available rides.</p>

        <div className="mt-6">
          {/* Ride cards placeholder */}
          <p className="text-sm text-gray-500 italic">Available ride cards will go here…</p>
        </div>
      </div>
    </div>
  );
}
