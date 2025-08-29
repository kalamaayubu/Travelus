"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Car, Users, MapPin, FileQuestion } from "lucide-react"; // example icons
import FeatureCard from "./FeatureCard";
import Heading from "../Heading";

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return; // prevent null

    const cards = sectionRef.current.querySelectorAll(".feature-card");
    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        }
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center bg-gray-950 text-white py-24 px-6"
    >
      <div className="max-w-[1000px] flex flex-col items-center text-center">
        <Heading icon={<FileQuestion className="w-4 h-4"/>} title="Why Travelus"/>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          Designed to make your trips effortless — whether you’re a driver or
          passenger.
        </p>
      </div>

      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {/* Card 1 */}
        <FeatureCard
            icon={<Car className="w-12 h-12 text-green-400"/>}
            title="Easy Rides"
            description="Find rides instantly with real-time matching between drivers and passengers."
        />

        {/* Card 2 */}
        <FeatureCard
          icon={<Users className="w-12 h-12 text-green-400" />}
          title="Community Driven"
          description="Trusted by thousands of daily users, making your journey safer and more reliable."
        />

        {/* Card 3 */}
        <FeatureCard
          icon={<MapPin className="w-12 h-12 text-green-400" />}
          title="Smart Tracking"
          description="Stay on top of your journey with live location and ride updates."
        />
      </div>
    </section>
  );
}
