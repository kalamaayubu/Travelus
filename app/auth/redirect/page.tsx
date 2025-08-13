'use client';

import Logo from '@/components/Logo';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Simulate short delay before redirect
    const timer = setTimeout(() => {
      router.push('/dashboard'); // Change this to your desired post-login route
    }, 200000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen text-gray-300 flex flex-col items-center justify-center p-4">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        
        <Logo />

        <h2 className="text-2xl font-bold text-white mt-4">Welcome Back!</h2>
        <p className="text-gray-400 mt-2">We’re signing you in via Google…</p>

        {/* Spinner */}
        <div className="mt-6 flex justify-center">
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>

        <p className="text-sm text-gray-500 mt-6">You will be redirected shortly…</p>
      </div>
    </div>
  );
}
