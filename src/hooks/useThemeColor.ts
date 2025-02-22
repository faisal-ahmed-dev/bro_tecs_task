// hooks/useThemeColor.ts
"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export const useThemeColor = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure the component is mounted before accessing localStorage
  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize theme from localStorage
  useEffect(() => {
    if (mounted) {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "light" || savedTheme === "dark") {
        setTheme(savedTheme); // Sync with next-themes
      }
    }
  }, [mounted, setTheme]);

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    if (mounted && theme) {
      localStorage.setItem("theme", theme);
    }
  }, [theme, mounted]);

  return { theme, setTheme, mounted };
};