"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Heading from "../Heading";

export default function FeedbackSection() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <section id="feedback" className="py-20 px-6 bg-gray-950 text-white">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <Heading title="We Value Your Feedback"/>
        <p className="text-gray-400 mt-2">
          Help us improve Travelus by sharing your thoughts. 🚀
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-xl mx-auto rounded-2xl p-8 bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl"
      >
        {/* Rating */}
        {/* <div className="flex justify-center mb-6">
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
              <button
                key={index}
                type="button"
                onClick={() => setRating(starValue)}
                onMouseEnter={() => setHover(starValue)}
                onMouseLeave={() => setHover(0)}
                className="transition-transform transform hover:scale-110 bg-transparent"
              >
                <Star
                  className={`w-4 h-4 ${
                    starValue <= (hover || rating) ? "fill-indigo-600 text-indigo-600" : "text-gray-500"
                  }`}
                />
              </button>
            );
          })}
        </div> */}

        {/* Feedback Form */}
        <form className="space-y-6">
          <motion.input
            whileFocus={{ scale: 1.02, borderColor: "#22c55e", boxShadow: "0 0 10px #22c55e" }}
            transition={{ type: "spring", stiffness: 300 }}
            type="text"
            placeholder="Your Name"
            className="w-full rounded-lg p-3 bg-gray-700/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none"
          />

          <motion.input
            whileFocus={{ scale: 1.02, borderColor: "#22c55e", boxShadow: "0 0 10px #22c55e" }}
            transition={{ type: "spring", stiffness: 300 }}
            type="email"
            placeholder="Your Email"
            className="w-full rounded-lg p-3 bg-gray-700/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none"
          />

          <motion.textarea
            whileFocus={{ scale: 1.02, borderColor: "#22c55e", boxShadow: "0 0 10px #22c55e" }}
            transition={{ type: "spring", stiffness: 300 }}
            placeholder="Share your thoughts..."
            rows={4}
            className="w-full rounded-lg p-3 bg-gray-700/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none"
          />

          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 0 20px #6366f1" }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 bg-green-600 rounded-lg font-semibold shadow-lg"
          >
            Send Feedback ✨
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
}
