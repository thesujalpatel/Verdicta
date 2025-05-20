"use client";

import { useEffect, useState } from "react";
import { PiSun, PiMoon, PiDevices } from "react-icons/pi";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("system");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "system";
    setTheme(savedTheme);
    applyTheme(savedTheme);

    if (savedTheme === "system") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => applyTheme("system");
      media.addEventListener("change", handler);
      return () => media.removeEventListener("change", handler);
    }
  }, []);

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

  const handleChange = (value: string) => {
    setTheme(value);
    localStorage.setItem("theme", value);
    applyTheme(value);
  };

  return (
    <div className="flex items-center">
      <PiSun
        size={35}
        className={`cursor-pointer p-2 ${
          theme === "light"
            ? "text-primary bg-primary/10"
            : "text-foreground/50"
        }`}
        onClick={() => handleChange("light")}
      />
      <PiDevices
        size={35}
        className={`cursor-pointer p-2 ${
          theme === "system"
            ? "text-primary bg-primary/10"
            : "text-foreground/50"
        }`}
        onClick={() => handleChange("system")}
      />
      <PiMoon
        size={35}
        className={`cursor-pointer p-2 ${
          theme === "dark" ? "text-primary bg-primary/10" : "text-foreground/50"
        }`}
        onClick={() => handleChange("dark")}
      />
    </div>
  );
}
