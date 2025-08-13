'use client'

import Logo from '@/components/Logo';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    // Handle login logic here
    console.log('Login attempt with:', { email, password });
    // On successful login, redirect or update state
  };

  return (
    <div className="min-h-screen text-gray-300 flex items-center justify-center p-4">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        
        <Logo/>

        {/* Small Sentence */}
        <p className="text-center text-gray-400 mb-8">Enter your credentials to log in.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-400">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder='example@gmail.com'
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-400">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder='********'
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded-md font-semibold hover:bg-green-600 transition duration-300 mt-4"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Dont have an account?{' '}
          <Link href="/auth/signup" className="text-green-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}