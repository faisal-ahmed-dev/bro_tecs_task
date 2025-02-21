"use client"; // Mark this as a client component since we're using hooks

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded"
    >
      Toggle {theme === "dark" ? "Light" : "Dark"} Mode
    </button>
  );
}