"use client"

import Sidebar from "@/components/driver/Sidebar"
import TopNav from "@/components/driver/TopNav"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react"

export default function DriverDashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="h-screen flex flex-col text-gray-400">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar/>

        {/* TopNav and Main page content */}
        <div className="flex-1 flex flex-col bg-gray-950 gap-4 px-4 lg:px-6">
            {/* Top navigation */}
            <TopNav />

            {/* Main content */}
                <ScrollArea className="h-full bg-transparent pb-28 rounded-lg transition-all duration-300">
                    {children}
                </ScrollArea>
        </div>
      </div>
    </div>
  )
}
