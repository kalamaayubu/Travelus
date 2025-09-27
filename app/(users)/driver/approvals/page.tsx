"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, User } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

// Dummy data for passengers
const dummyPassengers = [
  { id: 1, name: "Alice Johnson", seat: "A1", confirmed: false },
  { id: 2, name: "Bob Smith", seat: "A2", confirmed: false },
  { id: 3, name: "Carol White", seat: "B1", confirmed: true },
  { id: 4, name: "David Lee", seat: "B2", confirmed: false },
];

export default function DriverRideConfirmationPage() {
  const [passengers, setPassengers] = useState(dummyPassengers);
  const [selectedRide, setSelectedRide] = useState("Ride 1");
  const [sendingMass, setSendingMass] = useState(false);

  // Send notification to a single passenger
  const sendNotification = (id: number) => {
    setPassengers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, confirmed: true } : p))
    );
    toast.success("Notification sent!");
  };

  // Send notification to all unconfirmed passengers
  const sendMassNotification = () => {
    setSendingMass(true);
    setTimeout(() => {
      setPassengers((prev) => prev.map((p) => ({ ...p, confirmed: true })));
      setSendingMass(false);
      toast.success("Notifications sent to all successfuly!");
    }, 5000);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-white">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
      >
        {/* Ride selection */}
        <select
          className="bg-gray-800 text-white px-4 min-w-60 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500"
          value={selectedRide}
          onChange={(e) => setSelectedRide(e.target.value)}
        >
          <option>Ride 1</option>
          <option>Ride 2</option>
          <option>Ride 3</option>
        </select>

        {/* Mass Notification */}
        <div className="mb-6 flex justify-end">
          <button
            onClick={sendMassNotification}
            disabled={sendingMass}
            className={`px-6 py-2 rounded-lg font-semibold `}
          >
            {sendingMass ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending...</span>
              </span>
            ) : (
              "Send Mass Notification"
            )}
          </button>
        </div>
      </motion.div>

      {/* Passenger List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {passengers.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-gray-800 rounded-lg p-4 flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <User className="w-6 h-6 text-green-500/80" />
              <div>
                <p className="font-semibold">{p.name}</p>
                <p className="text-gray-300 text-sm">Seat: {p.seat}</p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              {/* Status Badge */}
              <span
                className={`px-3 py-1 rounded-sm text-xs font-semibold ${
                  p.confirmed
                    ? "bg-green-600/10 text-green-600"
                    : "bg-yellow-600/10 text-yellow-600"
                }`}
              >
                {p.confirmed ? "Confirmed" : "Pending"}
              </span>

              {/* Individual Notification Button */}
              {!p.confirmed && (
                <button
                  onClick={() => sendNotification(p.id)}
                  className="px-3 py-1 rounded-sm bg-blue-600 hover:bg-blue-600 text-gray-50 text-sm font-medium"
                >
                  Notify
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
