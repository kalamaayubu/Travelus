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
    gsap.fromTo(imgRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" });
    gsap.fromTo(textRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.4, ease: "power3.out" });
    gsap.fromTo(btnRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.8, ease: "power3.out" });

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
    <section className="relative flex flex-col items-center justify-center text-center pt-32 pb-24 px-6 bg-gray-950 overflow-hidden">
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
            <rect x="0" y="0" width="100%" height="100%" fill="url(#side-fade)" />
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
        alt="Vehicle model"
        className="w-80 sm:w-[500px] md:w-[600px] h-auto drop-shadow-2xl relative z-10"
        width={1000}
        height={1000}
      />

      <div className="">
        {/* Tag/brief catch description of what travelus is */}
        <p className="mt-6 max-w-xl text-gray-400 text-lg md:text-xl lg:text-2xl relative z-10">
            <span className="">Seamless connection </span>
            between drivers/vehicle owners and passengers in real time, making daily travels
            faster and more reliable.
        </p>

        <button
            ref={btnRef}
            className="mt-6 px-12 py-3 md:px-16 md:text-lg rounded-lg relative z-10"
        >
            Try Travelus Now
        </button>
      </div>
    </section>
  );
}
