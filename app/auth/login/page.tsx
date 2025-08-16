'use client';

import Logo from '@/components/Logo';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { login } from '@/actions/auth.action'; // same style as signup
import { LoginFormData } from '@/types';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>();

  // Function to handle login submission
  const onSubmit = async (data: LoginFormData) => {
    const result = await login(data);

    if (result.success && result.redirectUrl) {
      alert(result.redirectUrl)
      router.push(result.redirectUrl);
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  return (
    <div className="min-h-screen text-gray-300 flex items-center justify-center p-4">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <Logo/>

        <p className="text-center text-gray-400 mb-8 mt-4">Enter your credentials to log in.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-400">Email</label>
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              {...register("email", { required: "Email is required" })}
              className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none focus:border-green-500"
            />
            {errors.email?.message && <p className="text-red-500 text-sm">{String(errors.email.message)}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-400">Password</label>
            <input
              type="password"
              id="password"
              placeholder="********"
              {...register("password", { required: "Password is required" })}
              className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none focus:border-green-500"
            />
            {errors.password?.message && <p className="text-red-500 text-sm">{String(errors.password.message)}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full font-semibold mt-4 py-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-4 justify-center">
                <Loader2 className="animate-spin w-[18px]" /> Logging in...
              </span>
            ) : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Don’t have an account?{' '}
          <Link href="/auth/signup" className="text-green-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
