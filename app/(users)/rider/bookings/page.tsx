"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Car, Clock } from "lucide-react";
import { useState } from "react";

// Mock data – replace with real  data from API/store
const bookings = [
  {
    id: "BK-1024",
    date: "2025-12-11",
    time: "08:30 AM",
    from: "Westlands",
    to: "JKIA Airport",
    status: "Completed",
    price: "KSh 1,250",
  },
  {
    id: "BK-1018",
    date: "2025-12-09",
    time: "06:10 PM",
    from: "CBD",
    to: "Kilimani",
    status: "Cancelled",
    price: "KSh 620",
  },
  {
    id: "BK-1003",
    date: "2025-12-06",
    time: "07:00 AM",
    from: "Roysambu",
    to: "Upper Hill",
    status: "Completed",
    price: "KSh 980",
  },
];

export default function MyBookings() {
  const [isCompleted, setIsCompleted] = useState(false);
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 md:p-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-gray-400 mt-1">
          A history of all your rides. Latest bookings appear first.
        </p>
      </motion.div>

      {/* Bookings List */}
      <div className="space-y-4">
        {bookings.map((booking, index) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800 cursor-pointer rounded-2xl p-5 shadow-md hover:shadow-xl transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Left section */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Calendar className="w-4 h-4" />
                  <span>{booking.date}</span>
                  <Clock className="w-4 h-4 ml-3" />
                  <span>{booking.time}</span>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-green-400 mt-1" />
                  <div className="text-sm">
                    <p className="font-medium">{booking.from}</p>
                    <p className="text-gray-400">to {booking.to}</p>
                  </div>
                </div>
              </div>

              {/* Right section */}
              <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold $
                    booking.status === "Completed"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {booking.status}
                </span>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Car className="w-4 h-4 text-gray-400" />
                  <span>{booking.price}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty state (keep for real data integration) */}
      {bookings.length === 0 && (
        <div className="text-center text-gray-400 mt-20">
          <p>You have not made any bookings yet.</p>
        </div>
      )}
    </div>
  );
}
