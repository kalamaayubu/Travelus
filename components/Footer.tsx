'use client';

import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  
      if (pathname.startsWith('/auth') || pathname === "/driver/post-ride") {
          return null; // Hide NavBar on auth pages
      }
  return (
    <footer className="bg-gray-900 text-white py-6 px-6 text-center">
        <p>&copy; {new Date().getFullYear()} Travelus. All rights reserved.</p>
    </footer>
  )
}

export default Footer