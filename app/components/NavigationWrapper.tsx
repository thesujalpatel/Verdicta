"use client";

import { usePathname } from "next/navigation";
import Navigation from "./navigation";

export default function NavigationWrapper() {
  const pathname = usePathname();
  if (pathname === "/") return null; // hide navigation on landing page
  return <Navigation />;
}
