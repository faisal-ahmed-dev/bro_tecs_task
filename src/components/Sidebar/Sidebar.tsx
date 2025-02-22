"use client"
import React, { useState } from "react";
import Link from "next/link";
import { Home, Users } from "lucide-react";
import { Button } from "../ui/Button";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:w-64 h-screen flex flex-col bg-background shadow-md text-foreground">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <div className="p-4 ml-1 text-2xl font-bold tracking-widest text-foreground">
          
        </div>
        <nav className="mt-4 text-sm flex-1">
          <ul>
            <li>
              <Link href="/card-view" className="flex items-center p-2 rounded-md hover:bg-muted">
                <Home className="mx-3 w-5 h-5" />
                Card View
              </Link>
            </li>
            <li>
              <Link href="/table-view" className="flex items-center p-2 rounded-md hover:bg-muted">
                <Users className="mx-3 w-5 h-5" />
                Table View
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <Button onClick={() => setIsOpen(true)} variant="outline" size="icon" className="m-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </Button>
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-background shadow-lg transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-50`}
        >
          <nav className="mt-4 flex-1">
            <ul>
              <li>
                <Link href="/card-view" className="flex items-center p-2 rounded-md hover:bg-muted">
                  <Home className="mx-3 w-5 h-5" />
                  Card View
                </Link>
              </li>
              <li>
                <Link href="/table-view" className="flex items-center p-2 rounded-md hover:bg-muted">
                  <Users className="mx-3 w-5 h-5" />
                  Table View
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;