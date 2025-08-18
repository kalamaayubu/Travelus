'use client';

import { signup } from "@/actions/auth.action";
import { SignupFormData } from "@/types";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";


export default function Signup() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignupFormData>();

  // Function to handle form submission
  const onSubmit = async (data: SignupFormData) => {
    const result = await signup(data);

    if (result.success) {
      alert(result.message);
    } else {
      alert(`Error: ${result.error}`);
    }
  };
  
  return (
    <>
        <p className="text-center text-gray-400 mb-8">Create your account and enjoy the experience</p>

        <button className="w-full mt-4 bg-gray-800 text-white py-[10px] text-md font-semibold flex items-center justify-center gap-4 hover:bg-gray-700">
          <Image src="/assets/googleLogo.png" alt="Google logo" width={24} height={24} />
          Continue with Google
        </button>
        <div className='flex items-center gap-4 mt-2 mb-4'>
          <div className='h-[1px] w-full bg-gray-700'/>
          <span>or</span>
          <div className='h-[1px] w-full bg-gray-700'/>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <input
              className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none focus:border-green-500"
              type="text"
              id="name"
              placeholder="Username"
              {...register("name", { required: "Username is required"})}
            />
            {errors.name?.message && <p className="text-red-500 text-sm">{String(errors.name.message)}</p>}
          </div>

          <div>
            <input
              className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none focus:border-green-500"
              type="email"
              id="email"
              placeholder="Email address"
              {...register("email", { required: "Email is required"})}
            />
            {errors.email?.message && <p className="text-red-500 text-sm">{String(errors.email.message)}</p>}
          </div>

          <div>
            <input
              className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none focus:border-green-500"
              type="password"
              id="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? <span className="flex items-center gap-4 justify-center"><Loader2 className="animate-spin w-[18px]"/> Processing...</span> : "Create Account"}
          </button>
        </form>
    
        <p className="mt-6 text-center text-gray-300 text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-green-500 hover:underline">
            Login
          </Link>
        </p>
    </>
  );
}