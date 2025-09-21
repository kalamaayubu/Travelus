"use client";

import DashboardCard from "@/components/driver/DashboardCard";
import EarningsChart from "@/components/driver/EarningsChart";
import RecentBookingsTable from "@/components/driver/RecentBookingsTable";
import RideDistributionChart from "@/components/driver/RideDistributionChart";
import { motion } from "framer-motion";
import { Users, Car, CreditCard, Calendar } from "lucide-react";


export default function DriverDashboard() {
  return (
    <div className="space-y-8">
      {/* Top Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <DashboardCard
            title="Rides"
            value="128"
            icon={<Users className="w-8 h-8 text-green-500" />}
            gradient="from-green-50 to-green-100 dark:from-green-400/5 dark:to-green-900/30"
          />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
          <DashboardCard
            title="Seats"
            value="540"
            icon={<Car className="w-8 h-8 text-blue-500" />}
            gradient="from-blue-50 to-blue-100 dark:from-blue-400/5 dark:to-blue-900/30"
          />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <DashboardCard
            title="Earnings"
            value="KES 45,300"
            icon={<CreditCard className="w-8 h-8 text-purple-500" />}
            gradient="from-purple-50 to-purple-100 dark:from-purple-400/5 dark:to-purple-900/30"
          />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
          <DashboardCard
            title="Upcoming"
            value="6"
            icon={<Calendar className="w-8 h-8 text-orange-500" />}
            gradient="from-orange-50 dark:from-orange-400/5 dark:to-orange-900/30"
          />
        </motion.div>
      </div>

      {/* Line chart*/}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
          <EarningsChart />
        </motion.div>

        {/* Pie chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
          <RideDistributionChart />
        </motion.div>
      </div>

      {/* Recent Bookings */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}>
        <RecentBookingsTable />
      </motion.div>
    </div>
  );
}
