"use client";
import ThemeToggle from "../components/ThemeToggle";

 // Mark as a client component if needed


export default function Topbar() {
  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-gray-200 dark:bg-gray-900 flex items-center justify-between px-4 border-b border-gray-300 dark:border-gray-700">
      <h1 className="text-lg font-bold text-black dark:text-white">My App</h1>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
      </div>
    </header>
  );
}