"use client";

import { Bell, HelpCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function getRiderTitle(pathname: string) {
  if (pathname === "/rider") return "Dashboard";
  if (pathname.startsWith("/rider/rides")) return "Available Rides";
  if (pathname.startsWith("/rider/bookings")) return "My Bookings";
  if (pathname.startsWith("/rider/payments")) return "Payments";
  if (pathname.startsWith("/rider/support")) return "Support";
  if (pathname.startsWith("/rider/notifications")) return "Notifications";
  // Fallback for any other rider route
  if (pathname.startsWith("/rider")) return "Dashboard";
  return "";
}

export default function TopNav() {
  const pathname = usePathname();
  const title = getRiderTitle(pathname || "");

  return (
    <header className="h-16 md:flex text-gray-100 items-center justify-between py-3 pb-0">
      {/* Left section - dynamic page title */}
      <div className="items-center gap-6 hidden md:flex">
        <p className="text-gray font-bold text-2xl rounded-md whitespace-nowrap">
          {title && (
            <span>
              {title}
              <span className="text-green-500 text-xl">.</span>
            </span>
          )}
        </p>
      </div>

      {/* Right section */}
      <div className="md:flex hidden items-center gap-6 justify-end flex-1">
        {/* Notifications */}
        <Link
          href={"/rider/notifications"}
          className="relative cursor-pointer text-gray-200 hover:text-white transition-colors py-2 px-6 bg-gray-500/40 rounded-md"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-[6px] right-6 block w-2 h-2 bg-green-500 rounded-full" />
        </Link>

        {/* Help / Support shortcut */}
        <div className="cursor-pointer text-gray-200 hover:text-white transition-colors py-2 px-6 bg-gray-500/40 rounded-md flex items-center gap-2">
          <HelpCircle className="w-5 h-5" />
          <span className="hidden lg:block">Help</span>
        </div>
      </div>

      {/* Header for small screens */}
      <p className="text-2xl py-2 pb-0 md:hidden text-center font-bold">
        {title && (
          <span>
            {title}
            <span className="text-green-500 text-xl">.</span>
          </span>
        )}
      </p>
    </header>
  );
}
