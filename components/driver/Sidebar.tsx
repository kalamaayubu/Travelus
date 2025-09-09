'use client'

import Link from "next/link"
import React from "react"
import { Car, CreditCard, Settings, LogOut, Users, SidebarOpen, LayoutDashboard } from "lucide-react"
import { usePathname } from "next/navigation"
import Image from "next/image"



const Sidebar = () => {
    const pathname = usePathname()

    
    const navItems = [
        { label: "Dashboard", href: "/driver", icon: LayoutDashboard },
        { label: "My Rides", href: "/driver/rides", icon: Car },
        { label: "Bookings", href: "/driver/bookings", icon: Users },
        { label: "Payments", href: "/driver/payments", icon: CreditCard },
    ]
    
    const navFooterItems = [
        { label: "Settings", href: "/driver/settings", icon: Settings },
        { label: "Logout", href: "/logout", icon: LogOut },
    ]

  return (
    <aside className="w-52 p-4 bg-gray-950 text-gray-400 space-y-2 hidden md:block">
        {/* Logo */}
        <div className="flex items-center justify-between mb-8 gap-6 ml-3">
            <div className="flex items-center justify-center gap-2">
                <Image src={'/assets/logo.svg'} height={200} width={200} alt="Logo" className="w-6"/>
                <p className="text-xl font-bold text-green-500">Travelus</p>
            </div>
            <SidebarOpen className="w-4 translate-y-1 float-right hover:text-gray-200 cursor-pointer hover:scale-105 transition-all duration-300"/>
        </div>
        {navItems.map(({ label, href, icon: Icon }) => (
        <Link
            key={href}
            href={href}
            className={`flex items-center justify-start gap-3 px-6 pl-3 py-2 rounded-md w-full hover:bg-gray-50/5 text-gray-400 hover:text-gray-200 transition-colors ${
                pathname === href ? "bg-gray-50/10 hover:bg-gray-50/10 text-gray-200" : ""
            }`}
        >
            <Icon className="w-5 h-5" />
            {label}
        </Link>
        ))}

        {/* Footer nav items */}
        <div className="absolute bottom-4 w-44">
        {navFooterItems.map(({ label, href, icon: Icon }) => (
            <Link
                key={href}
                href={href}
                className={`flex items-center justify-start gap-3 px-6 pl-3 py-2 rounded-md w-full text-gray-300 hover:bg-gray-50/5 hover:text-white transition-colors ${
                    pathname === href ? "bg-gray-50/10 hover:bg-gray-50/10 text-white font-medium" : ""
                }`}
            >
                <Icon className="w-5 h-5" />
                {label}
            </Link>
        ))}
        </div>
    </aside>
  )
}

export default Sidebar