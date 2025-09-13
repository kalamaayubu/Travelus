"use client"

import { Bell } from "lucide-react"
import { usePathname } from "next/navigation"
import AddRideButton from "./AddRideButton"

export default function TopNav() {
  const pathname = usePathname()

  return (
    <header
      className="h-16 md:flex items-center justify-between py-3 pb-0"
    >
        {/* Left section */}
        <div className="items-center gap-6 hidden md:flex">
            <p className=" text-gray font-bold text-2xl rounded-md whitespace-nowrap">
                {pathname === "/driver" && "Dashboard"}
                {pathname === "/driver/rides" && "My Rides"}
                {pathname === "/driver/bookings" && "Bookings"}
                {pathname === "/driver/payments" && "Payments"}
                {pathname === "/driver/settings" && "Settings"}
                {pathname.includes("/driver/rides/") && pathname.includes("/edit") && (
                  <span>Update Ride<span className="text-green-500">.</span></span>
                )}
            </p>
        </div>

      {/* Right section */}
      <div className="md:flex hidden items-center gap-6 justify-end flex-1">
        {/* Notifications */}
        <div className="relative cursor-pointer text-gray-300 hover:text-white transition-colors py-2 px-6 bg-gray-500/40 rounded-md">
          <Bell className="w-5 h-5" />
          <span className="absolute top-[6px] right-6 block w-2 h-2 bg-green-500 rounded-full" />
        </div>

        {/* Add a ride button */}
        <AddRideButton/>
      </div>

      {/* Header for small screens */}
      <p className="text-2xl py-2 pb-0 md:hidden text-center font-bold">
        {pathname === "/driver" && <span>Dashboard<span className="text-green-500">.</span></span>}
        {pathname === "/driver/rides" && <span>My Rides<span className="text-green-500">.</span></span>}
        {pathname === "/driver/bookings" && <span>Bookings<span className="text-green-500">.</span></span>}
        {pathname === "/driver/payments" && <span>Payments<span className="text-green-500">.</span></span>}
        {pathname === "/driver/settings" && <span>Settings<span className="text-green-500">.</span></span>}
        {pathname.includes("/driver/rides/") && pathname.includes("/edit") && (
          <span>Update Ride<span className="text-green-500">.</span></span>
        )}      
      </p>
    </header>
  )
}
