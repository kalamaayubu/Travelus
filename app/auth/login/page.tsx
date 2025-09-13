'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { login } from '@/actions/auth.action'; // same style as signup
import { LoginFormData } from '@/types';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/slices/authSlice';

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>();
  const dispatch = useDispatch()

  // Function to handle login submission
  const onSubmit = async (data: LoginFormData) => {
    const result = await login(data);

    if (result.success && result.redirectUrl) {
      // Save auth state to redux
      dispatch(setUser(result.user))
      router.push(result.redirectUrl);
      toast.success(result.message)
    } else {
      toast.error(`${result.error}`);
    }
  };

  return (
    <>
        <p className="text-center text-gray-400 mb-8">Enter your credentials to log in.</p>
        {/* <button className="w-full mt-4 bg-gray-800 text-white py-[10px] text-md font-semibold flex items-center justify-center gap-4 hover:bg-gray-700">
          <Image src="/assets/googleLogo.png" alt="Google logo" width={24} height={24} />
          Continue with Google
        </button>
        <div className='flex items-center gap-4 mt-2 mb-4'>
          <div className='h-[1px] w-full bg-gray-700'/>
          <span>or</span>
          <div className='h-[1px] w-full bg-gray-700'/>
        </div> */}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-400">Email</label>
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
            <label htmlFor="password" className="block text-sm mb-1 font-medium text-gray-400">Password</label>
            <input
              type="password"
              id="password"
              placeholder="********"
              {...register("password", { required: "Password is required" })}
              className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none focus:border-green-500"
            />
            {errors.password?.message && <p className="text-red-500 text-sm">{String(errors.password.message)}</p>}
          </div>

          <Link href={'/auth/forgot-password'}>
            Forgot password?
          </Link>

          {/* Submit */}
          <button
            type="submit"
            className="w-full font-semibold mt-1 py-2"
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
      </>
  );
}
