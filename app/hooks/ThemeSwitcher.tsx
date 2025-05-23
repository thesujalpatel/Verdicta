"use client";

import { useEffect, useState } from "react";
import { PiSun, PiMoon, PiDevices } from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("system");
  const [mounted, setMounted] = useState(false);

  // Use effect for client-side only code
  useEffect(() => {
    // Mark the component as mounted
    setMounted(true);

    // Get saved theme or use system default
    const savedTheme = localStorage.getItem("theme") || "system";
    setTheme(savedTheme);
    applyTheme(savedTheme);

    // Set up system theme change listener if needed
    if (savedTheme === "system") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => applyTheme("system");
      media.addEventListener("change", handler);
      return () => media.removeEventListener("change", handler);
    }
  }, []);

  // Apply theme to document
  const applyTheme = (value: string) => {
    let themeToApply = value;

    if (value === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      themeToApply = prefersDark ? "dark" : "light";
    }

    document.documentElement.setAttribute("data-theme", themeToApply);
  };

  // Handle theme change
  const handleChange = (value: string) => {
    setTheme(value);
    localStorage.setItem("theme", value);
    applyTheme(value);
  };

  // Prevent flash of incorrect theme by not rendering until mounted
  if (!mounted) return null;

  return (
    <div className="bg-foreground/5 rounded-full p-1 flex items-center shadow-inner w-fit">
      {["light", "system", "dark"].map((themeOption) => (
        <motion.button
          key={themeOption}
          onClick={() => handleChange(themeOption)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative rounded-full p-2 transition-all ${
            theme === themeOption
              ? "bg-primary text-background"
              : "text-foreground/60 hover:text-foreground/90"
          }`}
          aria-label={`Switch to ${themeOption} theme`}
        >
          {themeOption === "light" && <PiSun size={18} />}
          {themeOption === "system" && <PiDevices size={18} />}
          {themeOption === "dark" && <PiMoon size={18} />}

          {theme === themeOption && (
            <AnimatePresence>
              <motion.span
                className="absolute inset-0 bg-primary rounded-full -z-10"
                layoutId="theme-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </AnimatePresence>
          )}
        </motion.button>
      ))}
    </div>
  );
}
