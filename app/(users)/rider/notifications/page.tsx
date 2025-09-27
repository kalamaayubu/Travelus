"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import RideConfirmationDialog from "@/components/rider/RideConfirmationDialog";
import { CheckCircle } from "lucide-react";

const NotificationsPage = () => {
  const [selectedNotif, setSelectedNotif] = useState(null);
  const [confirmedIds, setConfirmedIds] = useState(new Set());

  const notifications = [
    {
      id: 1,
      title: "Confirm Ride",
      description: "Your ride from Nairobi to Mombasa is ready for boarding.",
      time: "2m ago",
    },
    {
      id: 2,
      title: "Payment Pending",
      description:
        "Please confirm you have boarded your ride to release payment.",
      time: "5m ago",
    },
  ];

  const handleConfirmed = (id) => {
    setConfirmedIds((prev) => new Set([...prev, id]));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="space-y-4">
        {notifications.map((notif) => {
          const isConfirmed = confirmedIds.has(notif.id);
          return (
            <motion.div
              key={notif.id}
              className={`p-4 rounded-lg shadow-lg cursor-pointer ${
                isConfirmed
                  ? "bg-gray-800 opacity-60 cursor-not-allowed"
                  : "bg-gray-800 hover:bg-gray-800/90 transition-all duration-200"
              }`}
              whileHover={!isConfirmed ? { scale: 1.02 } : {}}
              onClick={() => !isConfirmed && setSelectedNotif(notif)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{notif.title}</h3>
                  <p className="text-sm text-gray-200">{notif.description}</p>
                </div>
                <span className="text-xs text-gray-300">{notif.time}</span>
              </div>

              {isConfirmed && (
                <div className="flex items-center gap-1 text-green-500 mt-2">
                  <CheckCircle size={16} />{" "}
                  <span className="text-sm">Confirmed</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Confirmation dialog */}
      {selectedNotif && (
        <RideConfirmationDialog
          notif={selectedNotif}
          onClose={() => setSelectedNotif(null)}
          onConfirmed={() => handleConfirmed(selectedNotif.id)}
        />
      )}
    </div>
  );
};

export default NotificationsPage;
