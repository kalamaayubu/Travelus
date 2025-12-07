"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

export default function Hero() {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const beamRef = useRef<SVGPolygonElement | null>(null);

  useEffect(() => {
    // Intro animations
    gsap.fromTo(
      imgRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
    gsap.fromTo(
      textRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.4, ease: "power3.out" }
    );
    gsap.fromTo(
      btnRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.8, ease: "power3.out" }
    );

    // Gentle sway for the beam (like a hand-held torch)
    gsap.to(beamRef.current, {
      rotation: 2,
      yoyo: true,
      repeat: -1,
      duration: 2.2,
      ease: "sine.inOut",
      transformOrigin: "50% 0%", // pivot at apex
    });
  }, []);

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center text-center pt-32 pb-24 px-6 bg-gray-950 overflow-hidden"
    >
      {/* Torch Light Cone (SVG) */}
      <svg
        className="pointer-events-none absolute animate-pulse top-0 left-1/2 -translate-x-1/2"
        width={900}
        height={800}
        viewBox="0 0 900 800"
        aria-hidden
        style={{ zIndex: 0 }}
      >
        <defs>
          {/* Vertical falloff: bright at top, fades downwards */}
          <linearGradient id="beam-falloff" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.55" />
            <stop offset="45%" stopColor="#16a34a" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
          </linearGradient>

          {/* Side fade mask: opaque center, transparent edges */}
          <linearGradient id="side-fade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="black" stopOpacity="0" />
            <stop offset="50%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="black" stopOpacity="0" />
          </linearGradient>

          <mask id="soft-edges">
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#side-fade)"
            />
          </mask>

          {/* Optional soft blur for the entire cone */}
          <filter id="beam-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>

        {/* PERFECT CONE: apex at (450,0), base spanning full width at y=800 */}
        <g filter="url(#beam-blur)" mask="url(#soft-edges)">
          <polygon
            ref={beamRef}
            points="450,0 0,800 1000, 800"
            fill="url(#beam-falloff)"
          />
        </g>
      </svg>

      {/* Foreground content */}
      <Image
        ref={imgRef}
        src="/assets/vehicle1.png"
        alt=""
        className="w-80 sm:w-[500px] md:w-[600px] h-auto drop-shadow-2xl animate-pulse relative z-10"
        width={1000}
        height={1000}
        priority
      />

      <div className="">
        {/* Tag/brief catch description of what travelus is */}
        <p className="mt-6 max-w-xl font-bold text-gray-200 text-3xl relative z-10">
          Connecting drivers with empty seats to passengers going the
          <span className="green-indigo_text-gradient font-bold">
            {" "}
            same way
          </span>
        </p>

        <button
          ref={btnRef}
          onClick={() =>
            document
              .getElementById("waitlist")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="px-10 py-3 mt-6 rounded-lg font-semibold animate-pulse hover:animate-none transition-all duration-300 text-white hover:shadow-[0_0_40px_rgba(22,163,74,0.9)] shadow-[0_0_30px_rgba(22,163,74,0.8)]"
        >
          Available Rides
        </button>
      </div>
    </section>
  );
}
