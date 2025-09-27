"use client";

import { signup } from "@/actions/auth.action";
import { SignupFormData } from "@/types";
import { CarFront, Loader2, Users } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>();

  // Function to handle form submission
  const onSubmit = async (data: SignupFormData) => {
    const result = await signup(data);

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(`Error: ${result.error}`);
    }
  };

  return (
    <>
      <p className="text-center text-gray-300 mb-8">
        Create your account and enjoy the experience
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Radio buttons for Role */}
        <div className="flex gap-4">
          <div
            className={`cursor-pointer flex-1 px-4 py-4 border rounded-md text-center ${
              watch("role") === "driver"
                ? "bg-gray-800 text-gray-100 border-green-600"
                : "bg-gray-900 text-gray-300 border-gray-700"
            }`}
            onClick={() => setValue("role", "driver")}
          >
            <input
              type="radio"
              id="driver"
              value={"driver"}
              {...register("role", {
                required:
                  "Please select a role (sign up as a driver or a passanger)",
              })}
              className="hidden"
            />
            <div className="flex flex-col items-center justify-center">
              <CarFront size={32} className="text-gray-00" />
              <label
                htmlFor="driver"
                className="cursor-pointer text-gray-200 mt-1 text-sm font-semibold"
              >
                Sign up as a driver
              </label>
            </div>
          </div>
          <div
            className={`cursor-pointer flex-1 px-4 py-4 border rounded-md text-center ${
              watch("role") === "rider"
                ? "bg-gray-800 text-gray-100 border-green-600"
                : "bg-gray-900 text-gray-300 border-gray-700"
            }`}
            onClick={() => setValue("role", "rider")}
          >
            <input
              type="radio"
              id="rider"
              value={"rider"}
              {...register("role", {
                required:
                  "Please select a role (sign up as a driver or a passanger)",
              })}
              className="hidden"
            />
            <div className="flex flex-col items-center justify-center">
              <Users size={32} className="text-gray-00" />
              <label
                htmlFor="rider"
                className="cursor-pointer text-gray-200 mt-1 text-sm font-semibold"
              >
                Sign up as a passanger
              </label>
            </div>
          </div>
        </div>
        {errors.role?.message && (
          <p className="text-sm text-red-500 -translate-y-3">
            {String(errors.role.message)}
          </p>
        )}

        <div>
          <input
            className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none focus:border-green-500"
            type="text"
            id="name"
            placeholder="Username"
            {...register("name", { required: "Username is required" })}
          />
          {errors.name?.message && (
            <p className="text-red-500 text-sm">
              {String(errors.name.message)}
            </p>
          )}
        </div>

        <div>
          <input
            className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none focus:border-green-500"
            type="email"
            id="email"
            placeholder="Email address"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email?.message && (
            <p className="text-red-500 text-sm">
              {String(errors.email.message)}
            </p>
          )}
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
          {isSubmitting ? (
            <span className="flex items-center gap-4 justify-center">
              <Loader2 className="animate-spin w-[18px]" /> Processing...
            </span>
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-gray-200 text-sm">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-green-500 hover:underline">
          Login
        </Link>
      </p>
    </>
  );
}
