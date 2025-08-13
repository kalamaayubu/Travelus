'use client';

import Logo from '@/components/Logo';
import Link from 'next/link';
import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    // Handle forgot password logic here
    console.log('Password reset request for:', email);
    setMessage('If this email is registered, you will receive reset instructions.');
  };

  return (
    <div className="min-h-screen text-gray-300 flex items-center justify-center p-4">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">

        <Logo />

        <p className="text-center text-gray-400 mb-8">
          Enter your email address to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-400">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="example@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-500 text-sm">{message}</p>}

          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded-md font-semibold hover:bg-green-600 transition duration-300 mt-4"
          >
            Send Reset Link
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Remembered your password?{' '}
          <Link href="/auth/login" className="text-green-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
