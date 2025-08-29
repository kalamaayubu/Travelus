'use client'

import { ArrowBigRight} from "lucide-react";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeautresSection";
import HowItWorks from "@/components/landing/HowItWorks";
import FlowDiagram from "@/components/landing/FlowDiagram";
import Heading from "@/components/Heading";
import Testimonials from "@/components/landing/Testimonials";
import FAQSection from "@/components/landing/FAQSection";
import FeedbackSection from "@/components/landing/FeedbackSection";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";


export default function LandingPage() {
  return (
    <div className="bg-gray-950 text-white min-h-screen w-full overflow-x-hidden">
      <HeroSection/>
      <FeaturesSection/>

      {/* How it Works */}
      <HowItWorks/>

      <div className="p-8 flex flex-col bg-gradient-to-br text-center md:text-start from-gray-950 to-gray-900">
        <Heading title="How Travelus Works"/>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <FlowDiagram />
          <div className="p-4 hidden lg:flex rounded-full bg-gray-900 border border-gray-800">
            <ArrowBigRight className=" text-green-600"/>
          </div>
          <div className="flex flex-col">
            <p className="text-gray-500 sm:text-2xl sm:max-w-md md:max-w-lg">
              Drivers and riders seamlessly connect through Travelus. 
              Requests flow from the rider, converge at the Travelus platform, 
              and are instantly matched with available drivers for a smooth, 
              reliable, and stress-free ride experience.
            </p>
            <button
              className="mt-6 px-12 py-3 md:px-16 md:text-lg rounded-lg relative z-10"
            >
              Try Travelus Now
            </button>
          </div>
        </div>
      </div>

      <Testimonials/>

      {/* FAQ */}
      <FAQSection/>

      {/* Feedback */}
      <FeedbackSection/>

      {/* Call to action */}
      <CTA/>
      <Footer/>
    </div>
  );
}
