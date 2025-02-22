// components/ThemeToggle.tsx
"use client";

import { Switch } from "@/components/ui/switch";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function ThemeToggle() {
  const { theme, setTheme, mounted } = useThemeColor();

  // Handle theme toggle
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme); // Update next-themes and localStorage
  };

  // Prevent rendering until the component is mounted
  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm">☀️</span>
      <Switch
        checked={theme === "dark"}
        onCheckedChange={toggleTheme}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      />
      <span className="text-sm">🌙</span>
    </div>
  );
}