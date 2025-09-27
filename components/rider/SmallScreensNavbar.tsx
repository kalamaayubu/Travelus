"use client";

import { AppDispatch } from "@/redux/store";
import { Bell, ClipboardList, LayoutDashboard, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import MoreDropdown from "./MoreDropdown";

type NavLinkProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  badge?: React.ReactNode;
};

const NavLink = ({ href, icon, label, badge }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`relative flex flex-col items-center text-xs gap-[2px] cursor-pointer transition-all duration-300 ${
        isActive
          ? "text-white font-semibold"
          : "text-gray-300 hover:text-gray-100"
      }`}
    >
      {icon}
      {label}
      {badge && <div className="absolute left-4">{badge}</div>}{" "}
    </Link>
  );
};

const RiderSmallScreensNavbar = () => {
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <div className="md:hidden fixed py-1 border-t border-zinc-700/50 bottom-0 left-0 right-0 dark:bg-zinc-800/70 backdrop-blur-sm flex justify-around items-center z-20">
        {/* Home */}
        <NavLink
          href="/rider"
          icon={<LayoutDashboard className="w-4 h-4" />}
          label="Home"
        />

        {/* My Bookings / Rides */}
        <NavLink
          href="/rider/bookings"
          icon={<ClipboardList className="w-4 h-4" />}
          label="My Bookings"
        />

        {/* Find Ride */}
        <NavLink
          href="/available-rides"
          icon={<Search className="w-4 h-4" />}
          label="Find Ride"
        />

        {/* Notifications */}
        <NavLink
          href="/rider/notifications"
          icon={<Bell className="w-4 h-4" />}
          label="Alerts"
          badge={<div className="w-2 h-2 bg-green-500 rounded-full"></div>}
        />

        {/* More */}
        <MoreDropdown dispatch={dispatch} />
      </div>
    </>
  );
};

export default RiderSmallScreensNavbar;
