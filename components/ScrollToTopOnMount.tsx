"use client";

import { useEffect } from "react";

export default function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 👈 Smooth scroll
    });
  }, []);

  return null; // doesn't render anything
}
