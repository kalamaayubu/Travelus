'use client';

import Logo from '@/components/Logo';

export default function DriverRidesPage() {
  return (
    <div className="min-h-screen text-gray-300 flex items-center justify-center p-4">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <Logo />
        <h1 className="text-2xl font-bold mt-4 text-white">My Posted Rides</h1>
        <p className="text-gray-400 mt-2">Manage and view the rides you have posted.</p>

        <div className="mt-6">
          {/* Rides list placeholder */}
          <p className="text-sm text-gray-500 italic">Ride list will go here…</p>
        </div>
      </div>
    </div>
  );
}
