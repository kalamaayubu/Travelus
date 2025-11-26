import { CheckCircle, Users, Calendar, CarFront } from "lucide-react";
import Heading from "../Heading";

const steps = [
  {
    icon: <CarFront className="w-6 h-6 text-orange-500" />,
    title: "Post a Ride",
    description:
      "Drivers share their upcoming trips so passengers heading the same way can easily find and book a seat.",
  },
  {
    icon: <Users className="w-6 h-6 text-purple-500" />,
    title: "Explore trips",
    description:
      "Browse available trips in seconds and connect with people heading your way. Finding a seat has never been this simple.",
  },
  {
    icon: <Calendar className="w-6 h-6 text-blue-500" />,
    title: "Book with Ease",
    description:
      "Reserve the exact seat you prefer from a visual seat layout, and skip the hassle of last-minute arrangements or overpriced rides.",
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-green-500" />,
    title: "Travel Smarter",
    description:
      "Enjoy a smooth journey with real-time updates, comfortable rides, and the peace of mind that comes with a modern platform built for you.",
  },
];

const AboutTravelus = () => {
  return (
    <section id="about" className="relative py-20 pb-36 px-6">
      <div className="max-w-5xl mx-auto text-center">
        {/* Heading */}
        <Heading title="More About Travelus" />
<<<<<<< HEAD
        <p className="mt-8 text-gray-200 text-lg md:text-xl">
=======
        <p className="mt-8 text-gray-300 text-lg md:text-xl">
>>>>>>> 92cd2e26e4104ffd0a31c3b5f7251265d1c25f38
          <strong className="text-green-600 opacity-90">Travelus</strong> is a
          modern ride-sharing platform that connects
          <strong> drivers with empty seats</strong> to passengers heading the
          same way. During peak times, like school openings or when public
          vehicles are full, it provides a<strong> reliable alternative</strong>
          . Even outside rush hours, it remains a
          <strong className="text-indigo-500 opacity-90"> smart choice</strong>:
          drivers earn from seats that would otherwise go empty by offering
          rides at a relatively lower cost, and passengers enjoy a
          <strong> smooth, affordable, and reliable journey</strong>. In the
          end, everyone goes home happy😂.
        </p>

        {/* Timeline */}
        <div className="relative flex justify-center">
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="relative flex flex-col items-center text-center max-w-[340px] p-6 rounded-2xl 
                          bg-white/5 border border-white/10 backdrop-blur-xl shadow-lg hover:scale-105 
                          transition-transform duration-300 w-full"
              >
                <div className="w-7 h-7 rounded-full z-10 text-white translate-y-4 -translate-x-4 bg-gradient-to-tr from-green-950 to-indigo-900 border border-white/20 backdrop-blur-xl">
                  {idx + 1}
                </div>
                {/* Icon bubble */}
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-green-400/20 to-indigo-500/20 border border-white/20 mb-4">
                  {step.icon}
                </div>

                <h3 className="text-lg font-semibold text-white">
                  {step.title}
                </h3>
<<<<<<< HEAD
                <p className="text-gray-200 mt-2">{step.description}</p>
=======
                <p className="text-gray-300 mt-2">{step.description}</p>
>>>>>>> 92cd2e26e4104ffd0a31c3b5f7251265d1c25f38
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTravelus;
