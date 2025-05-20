"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

export default function Navigation() {
  const pathname = usePathname();
  if (pathname === "/") return null; // hide navigation on landing page
  return (
    <div className="fixed top-50 left-0 flex items-start">
      <motion.div
        className="origin-top-left -rotate-90 text-2xl"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.5 }}
      >
        <Link
          href="/"
          className="text-xl bg-primary text-background font-bold p-2 px-4 pt-[20px] font-[family-name:var(--font-cinzel)] tracking-wider"
        >
          Verdicta
        </Link>
      </motion.div>
    </div>
  );
}
