"use client";

import { motion } from "framer-motion";
import { Construction } from "lucide-react";
import Link from "next/link";

export default function Payments() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      {/* Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Construction className="w-24 h-24 text-orange-400 animate-pulse" />
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-4xl md:text-5xl font-bold mb-4 text-center"
      >
        Payments
      </motion.h1>

      {/* Message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-gray-200 text-center mb-8 max-w-md"
      >
        This feature is under development. Stay tuned for updates and new
        functionality!
      </motion.p>

      {/* Redirect Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-auto"
      >
        <Link
          href="/rider"
          className="px-8 py-3 bg-linear-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300"
        >
          Back to Dashboard
        </Link>
      </motion.div>
    </div>
  );
}
