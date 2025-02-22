import React from "react";
import { BellRing, Search } from "lucide-react";
import { TbDrone } from "react-icons/tb";
import { PiChatsBold } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";
import ThemeToggle from "../ui/ThemeToggle"; 
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/Button";

const TopNav: React.FC = () => {
  return (
    <header className="flex flex-wrap items-center justify-between px-4 md:px-10 py-3 bg-background shadow-sm dark:bg-gray-900 dark:text-white">
    {/* Search Field */}
    <div className="relative flex items-center w-full md:max-w-lg p-4 ml-1 text-2xl font-bold  text-foreground">
    Brotecs Technologies
    </div>
  
    {/* Notification and Profile */}
    <div className="flex items-center space-x-4 mt-3 md:mt-0">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-10 w-10 rounded-full bg-yellow-400 hover:bg-yellow-500">
        A
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuItem>
        Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
        Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
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