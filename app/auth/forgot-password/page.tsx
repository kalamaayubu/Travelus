'use client';

import { forgotPassword } from '@/actions/auth.action';
import AlertDialog from '@/components/reusable/AlertDialog';
import { Check, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { toast } from 'sonner';

type ForgotPasswordFormData = {
  email: string;
}

export default function ForgotPasswordPage() {
  const { 
    register, 
    handleSubmit,
    reset, 
    formState: { errors, isSubmitting}
  } = useForm<ForgotPasswordFormData>();

  const [openResetLinkSentDialog, setOpenResetLinkSentDialog] = useState(false)

  const onSubmit = async (data: ForgotPasswordFormData) => {
    const res = await forgotPassword(data.email);
    if (!res.success) {
      toast.error(res.error);
      return;
    }

    reset()
    setOpenResetLinkSentDialog(true)
  }
  

  return (
      <>
        <p className="text-center text-gray-400 mb-8">
          Enter your email address to reset your password.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate  className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-400">Email</label>
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-green-500 focus:border-green-500"
              {...register("email", { 
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
            />
          </div>
          {errors.email && <p className="text-red-500 -translate-y-3 text-sm">{errors.email.message}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full font-semibold mt-4"
          >
            {isSubmitting ? <span className='flex items-center gap-2 justify-center'><Loader2 className='w-4 h-4 animate-spin'/>Sending...</span> : 'Send Reset Link'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Remembered your password?{' '}
          <Link href="/auth/login" className="text-green-500 hover:underline">
            Login
          </Link>
        </p>

        {/* Reset link sent successful dialog */}
        <AlertDialog
          open={openResetLinkSentDialog}
          onOpenChange={setOpenResetLinkSentDialog}
          icon={<Check className="w-6 h-6 text-green-600"/>}
          title='Reset Link Sent'
          description='If your email is registered, you’ll receive a password reset link shortly.'
          actionLabel={'Got it'}
          onAction={() => setOpenResetLinkSentDialog(false)}
        />
      </>
  );
}
