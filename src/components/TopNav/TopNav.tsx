import React from "react";
import { BellRing, Search } from "lucide-react";
import { TbDrone } from "react-icons/tb";
import { PiChatsBold } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";
import ThemeToggle from "../ui/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/Button";
import Input from "../ui/Input";

const TopNav: React.FC = () => {
  return (
    <header className="flex flex-wrap items-center justify-between px-4 py-3 bg-background shadow-sm dark:bg-background dark:text-foreground">
      {/* Logo and Search Field */}
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="text-xl font-bold text-foreground">
          Brotecs Technologies
        </div>
      </div>

      {/* Notification and Profile */}
      <div className="flex items-center gap-4 mt-3 md:mt-0">
        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-10 w-10 rounded-full bg-yellow-400 hover:bg-yellow-500"
              aria-label="Profile"
            >
              A
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuItem>
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
    </header>
  );
};

export default TopNav;