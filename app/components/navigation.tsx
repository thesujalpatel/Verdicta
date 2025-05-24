"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

export default function Navigation() {
  const pathname = usePathname();
  if (pathname === "/") return null; // hide navigation on landing page

  return (
    <>
      {/* Desktop Navigation - Rotated */}
      <div className="hidden md:flex fixed top-1/2 left-0 items-start z-10">
        <motion.div
          className="origin-top-left -rotate-90 text-2xl "
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: 0.5,
          }}
        >
          <Link
            href="/"
            className="text-xl rounded-b-lg backdrop-blur-sm bg-primary/60 text-white font-bold p-2 px-4 pt-[20px] font-[family-name:var(--font-cinzel)] tracking-wider"
          >
            Verdicta
          </Link>
        </motion.div>
      </div>

      {/* Mobile/Tablet Navigation - Top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-10">
        <motion.div
          className="flex justify-center py-3 text-white w-[50%] mx-auto rounded-b-lg backdrop-blur-sm bg-primary/60 "
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: 0.3,
          }}
        >
          <Link
            href="/"
            className="text-lg font-bold px-4 font-[family-name:var(--font-cinzel)] tracking-wider"
          >
            Verdicta
          </Link>
        </motion.div>
      </div>

      {/* Mobile content spacer */}
      <div className="md:hidden h-16" />
    </>
  );
}
