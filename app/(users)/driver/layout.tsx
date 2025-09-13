"use client"

import Sidebar from "@/components/driver/Sidebar"
import SmallScreensNavbar from "@/components/driver/SmallScreensNavbar"
import TopNav from "@/components/driver/TopNav"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function DriverDashboardLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="h-screen flex flex-col text-gray-400">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar/> {/* Sidebar */}

        {/* TopNav and Main page content */}
        <div className="flex-1 flex flex-col bg-gray-800/20 gap-4 px-4 lg:px-6">
          <TopNav />
          {/* Main content */}
          <ScrollArea className="h-full pr-4 md:px-0 pb-36 md:pb-20">
            {children}
            <SmallScreensNavbar/> {/* Navigation for small screens */}
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
