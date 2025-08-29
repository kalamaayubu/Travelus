'use client';

import { usePathname } from "next/navigation";
import Logo from "./Logo";
import LogInOutBtn from "./LogInOutBtn";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const NavBar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Hide navbar on these routes
  if (pathname.startsWith("/auth") || pathname === "/driver/post-ride") return null;

  return (
    <header className="text-white p-6">
      {/* Desktop */}
      <nav className="md:flex hidden items-center justify-between space-x-6">
        <Logo />
        <ul className="space-x-4 flex">
          <li><LogInOutBtn /></li>
        </ul>
      </nav>

      {/* Mobile */}
      <div className="md:hidden relative">
        <nav className="flex flex-col relative">
          {/* Top bar (logo + toggle) */}
          <div className="flex items-center justify-between">
            <Logo />
            {isMenuOpen ? (
              <X onClick={() => setIsMenuOpen(false)} className="cursor-pointer" />
            ) : (
              <Menu onClick={() => setIsMenuOpen(true)} className="cursor-pointer" />
            )}
          </div>
        </nav>

        {/* Overlay menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              key="mobile-menu"
              className="fixed inset-0 z-50 bg-gray-900 flex flex-col p-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {/* Top bar inside overlay */}
              <div className="flex items-center justify-between mb-8">
                <Logo />
                <X
                  onClick={() => setIsMenuOpen(false)}
                  className="cursor-pointer"
                />
              </div>

              {/* Menu content */}
              <ul className="flex flex-col gap-4 mt-10 text-center">
                <Link onClick={() => setIsMenuOpen(false)} href={'/'} className="bg-gray-800 p-2 rounded-md w-full">Home</Link>
                <LogInOutBtn />
                <Link 
                  className="primary-btn w-full" 
                  onClick={() => setIsMenuOpen(false)}
                  href={"/available-rides"}
                >
                  Available rides
                </Link>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default NavBar;
