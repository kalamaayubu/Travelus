'use client';

import { usePathname } from "next/navigation";
import Logo from "./Logo";
import Link from "next/link";
import LogInOutBtn from "./LogInOutBtn";

const NavBar = () => {
  const pathname = usePathname();

  if (pathname.startsWith('/auth') || pathname === "/driver/post-ride") {
    return null; // Hide NavBar on auth pages
  }

  return (
    <header className="bg-gray-900 text-white py-4 px-6">
      <nav className="flex items-center justify-between space-x-6">
        <Logo />
        <ul className="flex space-x-4">
          <li><Link href="/auth/signup" className="hover:text-green-400">Sign Up</Link></li>
          <li><LogInOutBtn /></li>  {/* This is where the session is passed to the client */}
          {/* Consider adding a mobile menu for smaller screens */}
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
