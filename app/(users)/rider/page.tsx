"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, ClipboardList, Bell, Heart } from "lucide-react";

const RiderHomePage = () => {
  const quickActions = [
    {
      href: "/available-rides",
      icon: <Search className="w-6 h-6 mb-2" />,
      label: "Find Ride",
      gradient: "from-green-400 to-green-600",
    },
    {
      href: "/rider/rides",
      icon: <ClipboardList className="w-6 h-6 mb-2" />,
      label: "My Bookings",
      gradient: "from-blue-400 to-blue-600",
    },
    {
      href: "/rider/favorites",
      icon: <Heart className="w-6 h-6 mb-2" />,
      label: "Favorites",
      gradient: "from-pink-400 to-pink-600",
    },
  ];

  const upcomingRides = [
    { route: "Nairobi → Mombasa", date: "Sep 28, 2025" },
    { route: "Kisumu → Nairobi", date: "Oct 1, 2025" },
    { route: "Eldoret → Nairobi", date: "Oct 5, 2025" },
  ];

  const alerts = [
    "Ride confirmed for Nairobi → Mombasa",
    "Seat reserved for Kisumu → Nairobi",
    "Promo: 10% off next ride",
  ];

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Quick Actions */}
      <div className="flex gap-4 flex-wrap justify-center">
        {quickActions.map((action, idx) => (
          <motion.div
            key={action.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="flex-1 min-w-[150px]"
          >
            <Link href={action.href}>
              <div
                className={`bg-gradient-to-r ${action.gradient} text-white rounded-2xl shadow-lg hover:scale-105 transform transition-all cursor-pointer p-6 flex flex-col items-center`}
              >
                {action.icon}
                <span className="font-semibold text-sm">{action.label}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Upcoming Rides */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Upcoming Rides
        </h2>
        <div className="space-y-3">
          {upcomingRides.map((ride, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-4 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800/20 dark:to-gray-900/30 rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer flex justify-between items-center"
            >
              <span className="font-medium">{ride.route}</span>
              <span className="text-sm text-gray-00">{ride.date}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Alerts / Notifications */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Alerts
        </h2>
        <div className="space-y-2">
          {alerts.map((alert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-3 rounded-xl bg-white dark:bg-gray-800 shadow hover:shadow-lg transition-all cursor-pointer flex items-center gap-2 text-gray-800 dark:text-gray-100"
            >
              <Bell className="w-5 h-5 text-green-500" />
              <span className="text-sm">{alert}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RiderHomePage;
