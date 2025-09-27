"use client";

import { joinWaitlist } from "@/actions/general.action";
import { useForm } from "react-hook-form";
import { FaLinkedin, FaTelegram } from "react-icons/fa";
import { toast } from "sonner";
import { useState } from "react";
import { Check } from "lucide-react";
import AlertDialog from "./reusable/AlertDialog";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Footer() {
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm();
  const pathname = usePathname();

  // Hide footer on these routes
  if (
    pathname.startsWith("/auth") ||
    pathname.startsWith("/driver") ||
    pathname.startsWith("/rider")
  )
    return null;

  const onSubmit = async (data: { email: string }) => {
    const res = await joinWaitlist(data);
    if (!res.success) {
      toast.error(res.error);
      return;
    }

    setShowLoginDialog(true);
    reset();
  };

  return (
    <>
      <footer
        id="footer"
        className="relative bg-gray-950 border-t border-gray-800 py-16"
      >
        {/* Background glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-24 w-[300px] h-[300px] bg-indigo-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[250px] h-[250px] bg-purple-500/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1  lg:grid-cols-4 gap-12">
          {/* Logo + mission */}
          <div>
            <h3 className="text-2xl font-bold text-gray-50 mb-4">Travelus</h3>
            <p className="text-gray-300 leading-relaxed max-w-md">
              Reimagining travel for the modern world. Connecting people,
              places, and possibilities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-50 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3 text-gray-200">
              <li>
                <Link
                  href="/#about"
                  className="hover:text-indigo-600 transition"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/#faqs"
                  className="hover:text-indigo-600 transition"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div id="waitlist" className="w-3/4">
            <h4 className="text-lg font-semibold text-white mb-3">
              Join the waitlist
            </h4>
            <p className="text-gray-300 mb-4 max-w-md">
              Join the waitlist now and be the first to know when Travelus is
              launched.
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-3 max-w-md"
            >
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
                className={`rounded-lg bg-gray-900 text-gray-100 placeholder-gray-500 
                  border border-gray-700 focus:border-indigo-500 focus:outline-none 
                  animate-pulse focus:animate-none
                  ${errors.email ? "border-red-500 focus:border-indigo-500" : ""}
                  `}
              />
              {errors.email && (
                <p className="text-sm text-red-600 opacity-90 -translate-y-2">
                  {errors.email.message}
                </p>
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
        <div className="mt-16 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center px-10">
          <p className="text-gray-300">
            © {new Date().getFullYear()} Travelus. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="https://linkedin.com/in/johana-kalama-8083ba2b5"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-blue-400 transition text-xl"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://t.me/kalamaayubu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-blue-600 transition text-xl"
            >
              <FaTelegram />
            </a>
          </div>
        </div>
      </footer>

      <AlertDialog
        open={showLoginDialog}
        onOpenChange={setShowLoginDialog}
        icon={<Check className="w-6 h-6 text-green-500" />}
        actionLabel="Got it"
        title="Welcome to Travelus 🤗"
        description="Thanks for joining the Travelus waitlist. We will notify you as soon as we launch."
        onAction={() => setShowLoginDialog(false)}
      />
    </>
  );
}
