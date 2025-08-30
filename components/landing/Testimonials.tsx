"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Heading from "../Heading";

const testimonials = [
  {
    name: "James M.",
    role: "Rider",
    text: "Travelus made booking rides so seamless. I feel safer and more in control of my trips.",
    image: "/assets/testimonial1.jpeg",
  },
  {
    name: "Sarah K.",
    role: "Driver",
    text: "I’ve been earning more consistently with Travelus. The system is transparent and fair.",
    image: "/assets/testimonial2.jpg",
  },
  {
    name: "Michael O.",
    role: "Rider",
    text: "The app is sleek, fast, and reliable. I’ve already recommended it to all my friends.",
    image: "/assets/testimonial3.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-20 bg-gray-950">
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <Heading title="What they say about Travelus"/>
        <p className="text-gray-400 max-w-2xl mx-auto mb-12 mt-6">
          Real experiences from people moving with us every day.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-md backdrop-blur-lg hover:shadow-green-800/10 hover:scale-[1.02] transition-transform"
            >
              <Image
                src={t.image}
                alt={t.name}
                width={200}
                height={200}
                className="w-14 h-14 object-cover rounded-full mx-auto mb-4 border border-white/20"
              />
              <h3 className="text-lg font-semibold text-gray-300">{t.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{t.role}</p>
              <p className="text-gray-400 italic">“{t.text}”</p>
              <div className="flex justify-center mt-3 text-green-600">
                {"★★★★★"}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
