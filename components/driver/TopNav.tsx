"use client";

import { Bell } from "lucide-react";
import { usePathname } from "next/navigation";
import AddRideButton from "./AddRideButton";

function getDriverTitle(pathname: string) {
  if (pathname === "/driver") return "Dashboard";
  if (pathname.startsWith("/driver/rides")) {
    if (pathname.includes("/edit")) return "Update Ride";
    return "My Rides";
  }
  if (pathname.startsWith("/driver/bookings")) return "Bookings";
  if (pathname.startsWith("/driver/approvals")) return "Approvals";
  if (pathname.startsWith("/driver/payments")) return "Payments";
  if (pathname.startsWith("/driver/settings")) return "Settings";
  // Fallback for any other driver route
  if (pathname.startsWith("/driver")) return "Dashboard";
  return "";
}

export default function TopNav() {
  const pathname = usePathname();
  const title = getDriverTitle(pathname || "");

  return (
    <header className="h-16 md:flex text-gray-100 items-center justify-between py-3 pb-0">
      {/* Left section */}
      <div className="items-center gap-6 md:flex hidden">
        <p className=" text-gray font-bold text-3xl rounded-md whitespace-nowrap">
          {title && (
            <span>
              {title}
              <span className="text-green-500 text-xl">•</span>
            </span>
          )}
        </p>
      </div>

      {/* Right section */}
      <div className="hidden md:flex items-center gap-6 justify-end flex-1">
        {/* Notifications */}
        <div className="relative cursor-pointer text-gray-200 hover:text-white transition-colors py-2 px-6 bg-gray-500/40 rounded-md">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-6 block w-2 h-2 bg-green-500 rounded-full" />
        </div>

        {/* Add a ride button */}
        <AddRideButton />
      </div>

      {/* Header for small screens */}
      <p className="text-3xl py-2 pb-0 md:hidden text-center font-bold">
        {title && (
          <span>
            {title}
            <span className="text-green-500 text-xl">•</span>
          </span>
        )}
      </p>
    </header>
  );
}
