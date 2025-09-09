"use client"

import Link from "next/link"
import React, { useState } from "react"
import {
  Car,
  CreditCard,
  LogOut,
  Users,
  SidebarOpen,
  LayoutDashboard,
  User,
  MoreHorizontal,
} from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { logout } from "@/actions/auth.action"

const Sidebar = () => {
  const pathname = usePathname()
  const [openProfileDropdown, setOpenProfileDropdown] = useState(false)
  const [openSidebar, setOpenSidebar] = useState(true)
  const router = useRouter()

  const navItems = [
    { label: "Dashboard", href: "/driver", icon: LayoutDashboard },
    { label: "My Rides", href: "/driver/rides", icon: Car },
    { label: "Bookings", href: "/driver/bookings", icon: Users },
    { label: "Payments", href: "/driver/payments", icon: CreditCard },
  ]

  return (
    <motion.aside
      animate={{ width: openSidebar ? 208 : 76 }} // 208px when open, 76px collapsed
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative h-screen bg-gray-50/10 text-gray-400 hidden md:flex flex-col p-4 py-5 space-y-2"
    >
      {/* Logo + toggle */}
      <div className="flex items-center gap-2 overflow-hidden mb-8 ml-2">
        <Image
          src={"/assets/logo.svg"}
          height={200}
          width={200}
          alt="Logo"
          className="w-6"
        />
        <AnimatePresence>
          {openSidebar && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="text-xl font-bold text-green-500 whitespace-nowrap"
            >
              Travelus
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Toggle Button */}
      <SidebarOpen
        onClick={() => setOpenSidebar((prev) => !prev)}
        className={`absolute -right-4 top-4 w-8 h-8 p-2 rounded-full bg-gray-700/90 text-gray-400 hover:text-gray-200 hover:bg-gray-700 cursor-pointer transition-transform duration-300 ${
          openSidebar ? "rotate-180" : ""
        }`}
      />


      {/* Navigation */}
      {navItems.map(({ label, href, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={`flex items-center w-full whitespace-nowrap gap-3 px-3 py-2 rounded-md hover:bg-gray-50/5 hover:text-gray-200 transition-colors ${
            pathname === href
              ? "bg-gray-50/10 hover:bg-gray-50/10 text-gray-50"
              : "text-gray-400"
          }`}
        >
          <Icon className="w-5 h-5 flex-shrink-0" />
          <AnimatePresence>
            {openSidebar && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
                className="text-sm"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      ))}

      {/* Footer nav items */}
      <div className="absolute bottom-4 left-0 right-0 px-2">
        <div className="relative cursor-pointer text-gray-300 hover:text-gray-200 transition-colors py-2 px-2 hover:bg-white/10 rounded-md">
          <div
            onClick={() => setOpenProfileDropdown(!openProfileDropdown)}
            className="flex items-center justify-between gap-2"
          >
            <User className="w-6 h-6 rounded-full border border-gray-700 p-1 flex-shrink-0" />
            <AnimatePresence>
              {openSidebar && (
                <motion.span
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1"
                >
                  Driver
                </motion.span>
              )}
            </AnimatePresence>
            {openSidebar && <MoreHorizontal className="w-4 h-4" />}
          </div>

          <AnimatePresence>
            {openProfileDropdown && openSidebar && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="absolute z-50 left-full bottom-0 ml-2 overflow-hidden bg-gray-900 border border-gray-800 rounded-md"
              >
                <div
                  className="w-full flex items-center gap-3 text-left px-6 py-2 cursor-pointer text-sm text-gray-300 hover:bg-white/5 hover:text-white"
                  onClick={() => setOpenProfileDropdown(false)}
                >
                  <User className="w-[15px]" /> Profile
                </div>
                <div
                  className="w-full flex items-center gap-3 text-left px-6 py-2 cursor-pointer text-sm text-gray-300 hover:bg-red-600 hover:opacity-80 transition-all duration-300 hover:text-white"
                  onClick={() => {
                    logout()
                    router.push("/auth/login")
                    setOpenProfileDropdown(false)
                  }}
                >
                  <LogOut className="w-[15px]" /> <span>Logout</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  )
}

export default Sidebar
