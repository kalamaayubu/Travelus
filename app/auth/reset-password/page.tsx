"use client";

import { resetPassword } from "@/actions/auth.action";
import AlertDialog from "@/components/reusable/AlertDialog";
import { Check, Loader2, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type ResetPasswordFormData = {
  password: string;
  confirm: string;
};

export default function ResetPasswordPage() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>();

  const [openResetSuccessDialog, setOpenResetSuccessDialog] = useState(false);
  const [openResetErrorDialog, setOpenResetErrorDialog] = useState(false);
  const params = useSearchParams();
  const router = useRouter();

  // Watch password field for confirm validation
  const passwordValue = watch("password");

  const onSubmit = async (data: ResetPasswordFormData) => {
    const code = params.get("code") || "";
    if (!code) {
      alert("Invalid or missing reset code.");
      return;
    }
    const res = await resetPassword(data.password);

    if (!res.success) {
      setOpenResetErrorDialog(true);
      reset();
      return;
    }

    // Show success dialog and the redirect button
    setOpenResetSuccessDialog(true);
    return;
  };

  return (
    <>
      <p className="text-center text-gray-300 mb-8">
        Enter and confirm your new password.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-4"
      >
        {/* Password field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-300"
          >
            New Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="********"
            className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-green-500 focus:border-green-500"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm password field */}
        <div>
          <label
            htmlFor="confirm"
            className="block text-sm font-medium text-gray-300"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm"
            placeholder="********"
            className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-green-500 focus:border-green-500"
            {...register("confirm", {
              required: "Please confirm your password",
              validate: (value) =>
                value === passwordValue || "Passwords do not match",
            })}
          />
          {errors.confirm && (
            <p className="text-red-500 text-sm">{errors.confirm.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-500 text-white p-2 rounded-md font-semibold hover:bg-green-600 transition duration-300 mt-4 disabled:opacity-50"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Resetting...
            </span>
          ) : (
            "Reset Password"
          )}
        </button>
      </form>

      {/* Password reset successful dialog */}
      <AlertDialog
        open={openResetSuccessDialog}
        onOpenChange={setOpenResetSuccessDialog}
        title="Password Reset Successful"
        icon={<Check className="w-5 h-5 text-green-600" />}
        description="Your password has been updated successfully. You can now log in with your new password."
        actionLabel="Go to Login"
        onAction={() => router.push("/auth/login")}
      />

      {/* Password reset error dialog */}
      <AlertDialog
        open={openResetErrorDialog}
        onOpenChange={setOpenResetErrorDialog}
        title={`Couldn't Reset`}
        icon={<X className="w-6 h-6 text-red-500" />}
        description="An error occured while reseting your password. Please try again later."
        actionLabel="Okay"
        onAction={() => setOpenResetErrorDialog(false)}
      />
    </>
  );
}
