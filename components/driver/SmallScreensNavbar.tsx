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
        <div
          onClick={() => setOpenMore(!openMore)}
          className="flex flex-col gap-[2px] cursor-pointer items-center text-xs text-gray-400 hover:text-gray-200"
        >
          <MoreVertical className="w-4 h-4" />
          More
        </div>
      </div>

      {openMore && (
        <div className="md:hidden overflow-hidden min-w-1/2 fixed bottom-[50px] right-2 max-w-52 bg-gray-800/90 backdrop-blur-sm flex flex-col justify-center items-center text-center rounded-lg z-50 border border-white/10">
          <div className="w-full flex items-center gap-3 text-left py-2 px-6 cursor-pointer text-sm text-gray-300 hover:bg-gray-50/5 hover:text-white transition-all duration-300">
            <User className="w-[15px]" /> <span>Profile</span>
          </div>
          <div className="w-full flex items-center gap-3 text-left py-2 px-6 cursor-pointer text-sm text-gray-300 hover:bg-gray-50/5 hover:text-white transition-all duration-300">
            <Settings className="w-[15px]" /> <span>Settings</span>
          </div>
          <div
            onClick={() => {
              // Clear auth from store and redirect
              dispatch(clearUser())
              logout()
              setOpenMore(false)
              router.push("/auth/login")
            }}
            className="w-full hover:bg-red-500/80 flex items-center gap-3 text-left py-2 px-6 cursor-pointer text-sm text-gray-300 hover:text-white transition-all duration-300"
          >
            <LogOut className="w-[15px]" /> <span>Logout</span>
          </div>
        </div>
      )}

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
