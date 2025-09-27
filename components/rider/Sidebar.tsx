"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  CreditCard,
  HelpCircle,
  LogOut,
  SidebarOpen,
  MoreHorizontal,
  User,
  Settings,
  ClipboardList,
  Car,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { logout } from "@/actions/auth.action";
import { clearUser } from "@/redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { DropdownItem } from "@/types";
import ReusableDropdown from "../reusable/ReusableDropdown";

const Sidebar = () => {
  const userName = useSelector(
    (state: RootState) => state.auth.user?.user_metadata?.name
  );
  const [openSidebar, setOpenSidebar] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  // Render on client only
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  // Rider navigation items
  const navItems = [
    { label: "Dashboard", href: "/rider", icon: LayoutDashboard },
    { label: "My Bookings", href: "/rider/bookings", icon: ClipboardList },
    { label: "Find Ride", href: "/available-rides", icon: Car },
    { label: "Payments", href: "/rider/payments", icon: CreditCard },
    { label: "Support", href: "/rider/support", icon: HelpCircle },
  ];

  // Footer dropdown menu
  const footerItems: DropdownItem[] = [
    {
      label: "Profile",
      icon: <User className="w-[15px]" />,
    },
    {
      label: "Settings",
      icon: <Settings className="w-[15px]" />,
    },
    {
      label: "Logout",
      icon: <LogOut className="w-[15px]" />,
      onClick: () => {
        dispatch(clearUser());
        logout();
        router.push("/auth/login");
      },
      className: "hover:bg-red-600 hover:text-white",
    },
  ];

  return (
    <motion.aside
      animate={{ width: openSidebar ? 208 : 76 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative h-screen bg-gray-50/10 text-gray-300 hidden md:flex flex-col p-4 py-5 space-y-2"
    >
      {/* Logo + title */}
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

      {/* Toggle button */}
      <SidebarOpen
        onClick={() => setOpenSidebar((prev) => !prev)}
        className={`absolute -right-4 top-4 w-8 h-8 p-2 rounded-full bg-gray-700/90 text-gray-300 hover:text-gray-100 hover:bg-gray-700 cursor-pointer transition-transform duration-300 ${
          openSidebar ? "rotate-180" : ""
        }`}
      />

      {/* Navigation links */}
      {navItems.map(({ label, href, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={`flex items-center w-full whitespace-nowrap gap-3 px-3 py-2 rounded-md hover:bg-gray-50/5 hover:text-gray-100 transition-colors ${
            pathname === href
              ? "bg-gray-50/10 hover:bg-gray-50/10 text-gray-0"
              : "text-gray-300"
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

      {/* Dropdown (profile/settings/logout) */}
      <ReusableDropdown
        items={footerItems}
        contentClassName="absolute bottom-0 mb-2 w-48 hidden md:flex flex-col"
        trigger={
          <div className="flex mx-4 bg-gray-50/5 absolute bottom-4 left-0 right-0 px-3 items-center justify-between gap-2 cursor-pointer py-2 hover:bg-white/10 rounded-md text-gray-200 hover:text-gray-100 transition-colors">
            <User className="w-7 h-7 rounded-full border border-gray-700 p-1 flex-shrink-0" />
            {isClient && (
              <AnimatePresence>
                {openSidebar && (
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1"
                  >
                    {userName}
                  </motion.span>
                )}
              </AnimatePresence>
            )}
            {openSidebar && <MoreHorizontal className="w-4 h-4" />}
          </div>
        }
      />
    </motion.aside>
  );
};

export default Sidebar;
