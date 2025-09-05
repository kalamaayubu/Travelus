'use client'

import { joinWaitlist } from "@/actions/general.action";
import { useForm } from "react-hook-form";
import { FaLinkedin, FaTelegram } from "react-icons/fa";
import { toast } from "sonner";
import ReusableDialog from "./reusable/dialog";
import { useState } from "react";
import { Check, X } from "lucide-react";
import AlertDialog from "./reusable/AlertDialog";


export default function Footer() {
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const { register, handleSubmit, reset, formState: { isSubmitting, errors } } = useForm()

  const onSubmit = async (data: { email: string } ) => {
    const res = await joinWaitlist(data)
    if (!res.success) {
      toast.error(res.error)
      return
    }

    setShowLoginDialog(true)
    reset()
  }

  return (
    <>
      <footer id="footer" className="relative bg-gray-950 border-t border-gray-800 py-16">
        {/* Background glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-24 w-[300px] h-[300px] bg-indigo-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[250px] h-[250px] bg-purple-500/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1  lg:grid-cols-4 gap-12">
          {/* Logo + mission */}
          <div>
            <h3 className="text-2xl font-bold text-gray-300 mb-4">Travelus</h3>
            <p className="text-gray-500 text-sm leading-relaxed max-w-md">
              Reimagining travel for the modern world.  
              Connecting people, places, and possibilities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-300 mb-4">Quick Links</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="/#about" className="hover:text-indigo-600 transition">Features</a></li>
              <li><a href="/#faqs" className="hover:text-indigo-600 transition">FAQs</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div id="waitlist" className="w-3/4">
            <h4 className="text-lg font-semibold text-white mb-3">Join the waitlist</h4>
            <p className="text-gray-500 text-sm mb-4 max-w-md">Join the waitlist now and be the first to know when Travelus is launched.</p>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", { 
                  required: 'Email is required', 
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address"
                  }
                })}
                className={`rounded-lg bg-gray-900 text-gray-200 placeholder-gray-500 
                  border border-gray-700 focus:border-indigo-500 focus:outline-none 
                  animate-pulse focus:animate-none
                  ${errors.email ? 'border-red-500 focus:border-indigo-500' : ''}
                  `}
              />
              {errors.email && (
                <p className="text-sm text-red-600 opacity-90 -translate-y-2">{errors.email.message}</p>
              )}
              <button
                type="submit"
                disabled={!!errors.email || isSubmitting}
                className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
              >
                {isSubmitting ? "Joining..." : "Join Now"}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm px-10">
          <p className="text-gray-500">© {new Date().getFullYear()} Travelus. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="https://linkedin.com/in/johana-kalama-8083ba2b5" target="_blank" rel="noopener noreferrer" 
            className="text-gray-400 hover:text-blue-400 transition text-xl">
            <FaLinkedin/>
          </a>
          <a href="https://t.me/kalamaayubu" target="_blank" rel="noopener noreferrer" 
            className="text-gray-400 hover:text-blue-600 transition text-xl">
            <FaTelegram/>
          </a>
          </div>
        </div>
      </footer>
      
      {/* Dialog to show use successfully joined waitlist */}
      {/* <ReusableDialog
        open={showLoginDialog}
        onOpenChange={setShowLoginDialog}
        closable={false}
        contentClassName="bg-gray-900 border-1 border-gray-800"
      >
        <div className="relative mx-auto justify-center p-10 flex flex-col items-center bg-gray-800 hover:border hover:border-gray-700 rounded-full">
          <Check className="font-bold text-green-600 opacity-100"/>
        </div>
        <p className="text-center text-xl font-bold">Welcome to Travelus 🤗</p>
        <p className="text-sm text-center text-gray-400">
          Thanks for joining the Travelus waitlist. We will notify you as soon as we launch.
        </p>
        <button 
          className="primary-btn py-5 mt-4" 
          onClick={() => { 
            setShowLoginDialog(false)
          }}
        >
            Got it
        </button>
      </ReusableDialog> */}

      <AlertDialog
        open={showLoginDialog}
        onOpenChange={setShowLoginDialog}
        icon={<Check  className="w-6 h-6 text-green-500" />}
        actionLabel="Got it"
        title="Welcome to Travelus 🤗"
        description="Thanks for joining the Travelus waitlist. We will notify you as soon as we launch."
        onAction={() => setShowLoginDialog(false)}
      />
    </>
  );
}
