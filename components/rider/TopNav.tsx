"use client";

import { Bell, HelpCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TopNav() {
  const pathname = usePathname();

  return (
    <header className="h-16 md:flex text-gray-100 items-center justify-between py-3 pb-0">
      {/* Left section - dynamic page title */}
      <div className="items-center gap-6 hidden md:flex">
        <p className="text-gray font-bold text-2xl rounded-md whitespace-nowrap">
          {pathname === "/rider" && (
            <span>
              Dashboard<span className="text-green-500 text-xl">.</span>
            </span>
          )}
          {pathname === "/rider/rides" && (
            <span>
              Available Rides<span className="text-green-500 text-xl">.</span>
            </span>
          )}
          {pathname === "/rider/bookings" && (
            <span>
              My Bookings<span className="text-green-500 text-xl">.</span>
            </span>
          )}
          {pathname === "/rider/payments" && (
            <span>
              Payments<span className="text-green-500 text-xl">.</span>
            </span>
          )}
          {pathname === "/rider/support" && (
            <span>
              Support<span className="text-green-500 text-xl">.</span>
            </span>
          )}
          {pathname === "/rider/notifications" && (
            <span>
              Notifications<span className="text-green-500 text-xl">.</span>
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
        {pathname === "/rider" && (
          <span>
            Dashboard<span className="text-green-500 text-xl">.</span>
          </span>
        )}
        {pathname === "/rider/rides" && (
          <span>
            Available Rides<span className="text-green-500 text-xl">.</span>
          </span>
        )}
        {pathname === "/rider/bookings" && (
          <span>
            My Bookings<span className="text-green-500 text-xl">.</span>
          </span>
        )}
        {pathname === "/rider/payments" && (
          <span>
            Payments<span className="text-green-500 text-xl">.</span>
          </span>
        )}
        {pathname === "/rider/support" && (
          <span>
            Support<span className="text-green-500 text-xl">.</span>
          </span>
        )}
        {pathname === "/rider/notifications" && (
          <span>
            Notifications<span className="text-green-500 text-xl">.</span>
          </span>
        )}
      </p>
    </header>
  );
}
