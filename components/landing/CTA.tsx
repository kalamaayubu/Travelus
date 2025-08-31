import Heading from "../Heading";

export default function CTA() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-indigo-600/20 from-5% via-gray-950/10 via-40% to-green-600/10 to-100%">
      {/* Background glow effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-pink-500/30 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-3xl mx-auto text-center px-6">
        <Heading title="Here we go!"/>
        <p className="text-lg md:text-xl text-gray-500 mb-10 mt-6">
          Be part of the movement that’s reshaping how people move.  
          Your journey with <span className="font-semibold text-indigo-500">Travelus</span> starts today.
        </p>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            className="py-3 px-10 rounded-lg"
          >
            Try Travelus Now
          </button>
        </div>
      </div>
    </section>
  );
}
