import { CheckCircle, Users, Calendar } from "lucide-react";
import Heading from "../Heading";

const steps = [
  {
    icon: <Users className="w-6 h-6 text-orange-400" />,
    title: "Sign Up",
    description: "Create your free account in seconds and set up your profile.",
  },
  {
    icon: <Calendar className="w-6 h-6 text-blue-500" />,
    title: "Book Easily",
    description: "Choose your destination and reserve your spot instantly.",
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-green-600" />,
    title: "Enjoy the Ride",
    description: "Relax and experience seamless travel with real-time updates.",
  },
];

const HowItWorks = () => {
  return (
    <section className="relative py-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        {/* Heading */}
        <Heading title="How it works" />

        {/* Timeline */}
        <div className="relative mt-12 flex flex-col md:flex-row items-center md:justify-between gap-12">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative flex flex-col items-center text-center max-w-xs p-6 rounded-2xl 
                         bg-white/5 border border-white/10 backdrop-blur-xl shadow-lg hover:scale-105 
                         transition-transform duration-300 "
            >
              {/* Icon bubble */}
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-green-400/20 to-purple-500/20 border border-white/20 mb-4">
                {step.icon}
              </div>

              <h3 className="text-lg font-semibold text-gray-200">{step.title}</h3>
              <p className="text-sm text-gray-400 mt-2">{step.description}</p>

              {/* Connecting line for desktop */}
              {idx < steps.length && (
                <>
                  <div className="rotate-90 translate-y-[118px] -translate-x-1/2 left-1/2 z-0  md:block absolute top-1/2 right-[-6rem] w-12 h-[2px] bg-gradient-to-r from-green-400 to-blue-600"></div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
