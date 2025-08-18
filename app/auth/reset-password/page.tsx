'use client';

import Logo from '@/components/Logo';
import Link from 'next/link';
import { useState } from 'react';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!password || !confirm) {
      setError('Please fill in both password fields.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    // Handle password reset logic here
    console.log('New password set:', password);
    setSuccess('Your password has been successfully reset.');
  };

  return (
    <>
      <p className="text-center text-gray-400 mb-8">
        Enter and confirm your new password.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-400">New Password</label>
          <input
            type="password"
            id="password"
            value={password}
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1"
            required
          />
        </div>

        <div>
          <label htmlFor="confirm" className="block text-sm font-medium text-gray-400">Confirm Password</label>
          <input
            type="password"
            id="confirm"
            value={confirm}
            placeholder="********"
            onChange={(e) => setConfirm(e.target.value)}
            className='mt-1'
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded-md font-semibold hover:bg-green-600 transition duration-300 mt-4"
        >
          Reset Password
        </button>
      </form>
    </>
  );
}
