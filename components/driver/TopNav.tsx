"use client"

import { Bell, LogOut, Search, User } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import AddRideButton from "./AddRideButton"

export default function TopNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header
      className="h-16 bg-transparent rounded-lg flex items-center justify-between py-4"
    >
        {/* Left section */}
        <div className="flex items-center gap-6">
            <p className=" text-gray py-2 px-6 bg-amber-500/20 text-amber-400 rounded-md whitespace-nowrap">
                {pathname === "/driver" && "Dashboard"}
                {pathname === "/driver/rides" && "My Rides"}
                {pathname === "/driver/bookings" && "Bookings"}
                {pathname === "/driver/payments" && "Payments"}
                {pathname === "/driver/settings" && "Settings"}
            </p>
            {/* <p className=" text-gray py-2 px-6 bg-gray-500/40 rounded-md whitespace-nowrap">
                <Search className="w-4 h-4 inline-block mr-2 -translate-y-1"/>
                Search something...
            </p> */}
        </div>
      {/* Right section */}
      <div className="flex items-center gap-6 justify-end flex-1">
        {/* Notifications */}
        <div className="relative cursor-pointer text-gray-300 hover:text-white transition-colors py-2 px-6 bg-gray-500/40 rounded-md">
          <Bell className="w-5 h-5" />
          <span className="absolute top-[6px] right-6 block w-2 h-2 bg-green-500 rounded-full" />
        </div>

        {/* Add a ride button */}
        <AddRideButton/>

        {/* Profile Dropdown */}
        {/* <div className="relative cursor-pointer text-gray-300 hover:text-white transition-colors py-2 px-6 bg-gray-500/40 rounded-md">
          <div
            onClick={() => setOpen(!open)}
            className="flex cursor-pointer items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <User className="w-6 h-6 rounded-full border border-gray-700 p-1" />
            <span className="hidden md:block">Driver</span>
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="absolute z-50 right-0 mt-3 overflow-hidden bg-gray-900 border border-gray-800 rounded-md"
              >
                <div
                  className="w-full flex items-center gap-3 text-left px-6 py-2 cursor-pointer text-sm text-gray-300 hover:bg-white/5 hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  <User className="w-[15px]"/> Profile
                </div>
                <div
                  className="w-full flex items-center gap-3 text-left px-6 py-2 cursor-pointer text-sm text-gray-300 hover:bg-red-600 hover:opacity-80  transition-all duration-300 hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  <LogOut className="w-[15px]"/> <span>Logout</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div> */}
      </div>
    </header>
  )
}
