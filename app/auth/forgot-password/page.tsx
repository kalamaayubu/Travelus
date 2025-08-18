'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form'

type ForgotPasswordFormData = {
  email: string;
}

export default function ForgotPasswordPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting}} = useForm<ForgotPasswordFormData>();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    // Logic here...
  }
  

  return (
      <>
        <p className="text-center text-gray-400 mb-8">
          Enter your email address to reset your password.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}  className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-400">Email</label>
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-green-500 focus:border-green-500"
              {...register("email", { required: 'Email is required'})}
            />
          </div>

          <button
            type="submit"
            className="w-full font-semibold mt-4"
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
      </>
  );
}
