'use client';

import { usePathname } from "next/navigation";
import Logo from "./Logo";

const NavBar = () => {
    const pathname = usePathname();

    if (pathname.startsWith('/auth')) {
        return null; // Hide NavBar on auth pages
    }

  return (
    <header className="bg-gray-900 text-white py-6 px-6 md:px-8 flex justify-between items-center">
        <Logo/>
        <nav>
        <ul className="flex space-x-4">
            <li><a href="/auth/signup" className="hover:text-green-400">Sign Up</a></li>
            <li><a href="/auth/login" className="hover:text-green-400">Login</a></li>
            {/* Consider adding a mobile menu for smaller screens */}

        </ul>
        </nav>
    </header>
  )
}

export default NavBar