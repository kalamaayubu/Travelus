'use client';

import Logo from '@/components/Logo';

export default function PostRidePage() {
  return (
    <div className="min-h-screen text-gray-300 flex items-center justify-center p-4">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <Logo />
        <h1 className="text-2xl font-bold mt-4 text-white">Post a New Ride</h1>
        <p className="text-gray-400 mt-2">Fill in the details for your upcoming ride.</p>
        
        <div className="mt-6">
          {/* Ride form placeholder */}
          <p className="text-sm text-gray-500 italic">Ride form will go here…</p>
        </div>
      </div>
    </div>
  );
}
