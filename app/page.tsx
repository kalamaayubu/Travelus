'use client'

import HeroSection from "@/components/landing/HeroSection";
import FlowDiagram from "@/components/landing/FlowDiagram";
import Heading from "@/components/Heading";
import Testimonials from "@/components/landing/Testimonials";
import FAQSection from "@/components/landing/FAQSection";
import FeedbackSection from "@/components/landing/FeedbackSection";
import CTA from "@/components/landing/CTA";
import Image from "next/image";
import AboutTravelus from "@/components/landing/AboutTravelus";


export default function LandingPage() {
  return (
    <div className="bg-gray-950 text-white min-h-screen w-full overflow-x-hidden">
      <HeroSection/>

      {/* About section */}
      <AboutTravelus/>

      <div className="p-8 py-20 flex flex-col bg-gradient-to-br text-center md:text-start from-gray-950 to-gray-900">
        <Heading title="How Travelus Works"/>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <FlowDiagram />
            <Image
              src={'/assets/movingCarModal.svg'}
              width={200}
              height={100}
              alt=""
              className="hidden lg:flex"
            />
          <div className="flex flex-col items-center md:items-start text-center md:text-start">
            <p className="max-w-xl text-gray-500 text-lg md:text-xl">
              Through Travelus, passengers explore rides already posted by drivers and simply pick the one that fits their journey. The platform keeps them updated with timely notifications, ensuring they never miss their trip and every journey runs on time. It’s seamless, transparent, and built for peace of mind.
            </p>
            <button
              className="mt-6 px-12 py-3 rounded-lg"
            >
              Try Travelus Now
            </button>
          </div>
        </div>
      </div>

      {/* <Testimonials/> */}

      {/* FAQ */}
      <FAQSection/>

      {/* Feedback */}
      <FeedbackSection/>

      {/* Call to action */}
      <CTA/>
    </div>
  );
}
