'use client';

import { signup } from "@/actions/auth.action";
import Logo from "@/components/Logo";
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
    <div className="min-h-screen text-white flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="bg-gray-900 p-6 sm:p-8 rounded-lg shadow-xl max-w-md w-full">
        <Logo/>
        <h2 className="text-center text-gray-500 mb-8 mt-6">Create your account and enjoy the experience</h2>
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
        <div className="mt-6 text-center text-gray-400">
          <p>or</p>
        </div>
        <button className="w-full mt-4 bg-gray-800 text-white py-[10px] rounded-md text-md font-semibold flex items-center justify-center gap-4 hover:bg-gray-700 transition duration-300">
          <Image src="/assets/googleLogo.png" alt="Google logo" width={24} height={24} />
          Continue with Google
        </button>
        <p className="mt-6 text-center text-gray-300 text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-green-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}