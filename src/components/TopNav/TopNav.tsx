// TopNav.tsx
import React from "react";
import { BellRing } from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/Button";

const TopNav: React.FC = () => {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between px-4 md:px-6 py-4 bg-background border-b">
      {/* Logo - Only visible on mobile */}
      <div className="md:hidden flex items-center flex-1 ml-12">
        <h1 className="text-lg font-bold text-foreground">
          Brotecs Technologies
        </h1>
      </div>

      {/* Right side items */}
      <div className="flex items-center gap-3 ml-auto">
        <Button
          variant="outline"
          size="icon"
          className="hidden md:flex"
        >
          <BellRing className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 rounded-full bg-yellow-400 hover:bg-yellow-500"
            >
              <span className="sr-only">Open user menu</span>
              <span className="text-sm font-medium text-yellow-900">A</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="cursor-pointer">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-red-500">
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <ThemeToggle />
      </div>
    </header>
  );
};

export default TopNav;