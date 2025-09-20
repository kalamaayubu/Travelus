"use client"

import { logout } from "@/actions/auth.action"
import { clearUser } from "@/redux/slices/authSlice"
import { AppDispatch } from "@/redux/store"
import { handleAddRide } from "@/utils/handleAddRide"
import {
  Bell,
  Car,
  LayoutDashboard,
  LogOut,
  MoreVertical,
  Plus,
  Settings,
  User,
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "sonner"
import MoreDropdown from "./MoreDropDown"

type NavLinkProps = {
  href: string
  icon: React.ReactNode
  label: string
}

const NavLink = ({ href, icon, label }: NavLinkProps) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={`relative flex flex-col items-center text-xs gap-[2px] cursor-pointer transition-all duration-300 ${
        isActive
          ? "text-white font-semibold"
          : "text-gray-400 hover:text-gray-200"
      }`}
    >
      {icon}
      {label}
    </Link>
  )
}

const SmallScreensNavbar = () => {
  const [openMore, setOpenMore] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const pathname = usePathname()
  const dispatch = useDispatch<AppDispatch>()

  // Reset loading state after navigation complets
  useEffect(() => {
    if (isLoading) {
      setIsLoading(false)
    }
  }, [pathname])

  // Function to handle post ride
  const onAddRide = async () => {
    setIsLoading(true)
    const result = await handleAddRide(dispatch, router)

    if (!result.success) {
      console.error(result.error)
      toast.error(result.error)
    }
  }


  return (
    <>
      <div className="md:hidden fixed py-1 border-t border-zinc-700/50 bottom-0 left-0 right-0 dark:bg-zinc-800/70 backdrop-blur-sm flex justify-around items-center z-20">
        {/* Home */}
        <NavLink 
            href="/driver" 
            icon={<LayoutDashboard className="w-4 h-4" />} 
            label="Home" 
        />

        {/* My Rides */}
        <NavLink 
            href="/driver/rides" 
            icon={<Car className="w-4 h-4" />} 
            label="My Rides" 
        />

        {/* Post Ride (special styling) */}
        <div
          onClick={onAddRide}
          className={`relative flex flex-col items-center text-xs gap-[2px] cursor-pointer transition-all duration-300 ${
            pathname === "/driver/post-ride"
              ? "text-green-500 font-medium"
              : "text-gray-400 hover:text-gray-200"
          } group active:scale-90`}
        >
          <div
            className={`p-2 rounded-full transition ${
              pathname === "/driver/post-ride"
                ? "bg-green-500/20"
                : "bg-green-400/10 hover:bg-green-400/15"
            }`}
          >
            <Plus
              className={`w-4 h-4 ${
                pathname === "/driver/post-ride"
                  ? "text-green-600"
                  : "text-green-500 group-hover:text-green-500"
              }`}
            />
          </div>
          Post Ride
        </div>

        {/* Notifications */}
        <div className="relative flex flex-col group gap-[2px] cursor-pointer items-center text-xs text-gray-400 hover:text-gray-200">
          <Bell className="w-4 h-4" />
          Alerts
          <div className="bg-green-500 flex items-center justify-center group-hover:bg-green-400 w-2 h-2 left-4 rounded-full absolute" ></div>
        </div>

        {/* More */}
        <MoreDropdown dispatch={dispatch}/>
      </div>

      {/* ✅ Global loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100]">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-500"></div>
        </div>
      )}
    </>
  )
}

export default SmallScreensNavbar
