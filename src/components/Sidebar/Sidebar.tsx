"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Home, Users, X } from "lucide-react";
import { Button } from "../ui/Button";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('mobile-sidebar');
      if (isOpen && sidebar && !sidebar.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const NavLinks = () => (
    <ul className="space-y-2">
      <li>
        <Link 
          href="/card-view" 
          className="flex items-center p-3 rounded-lg hover:bg-muted transition-colors duration-200"
          onClick={() => setIsOpen(false)}
        >
          <Home className="w-5 h-5 mr-3" />
          <span className="font-medium">Card View</span>
        </Link>
      </li>
      <li>
        <Link 
          href="/table-view" 
          className="flex items-center p-3 rounded-lg hover:bg-muted transition-colors duration-200"
          onClick={() => setIsOpen(false)}
        >
          <Users className="w-5 h-5 mr-3" />
          <span className="font-medium">Table View</span>
        </Link>
      </li>
    </ul>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-64 h-screen bg-background border-r">
        <div className="p-6">
          <h1 className="text-xl font-bold tracking-wider text-foreground">Logo</h1>
        </div>
        <nav className="flex-1 px-3">
          <NavLinks />
        </nav>
      </div>

      {/* Mobile Trigger */}
      <div className="md:hidden fixed top-4 left-4 z-30">
        <Button 
          onClick={() => setIsOpen(true)} 
          variant="outline" 
          size="icon"
          className="bg-background"
        >
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
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-40" />
      )}
      <div
        id="mobile-sidebar"
        className={`
          fixed md:hidden top-0 left-0 h-screen w-[280px] bg-background 
          transform transition-transform duration-300 ease-in-out z-50
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between p-6">
          <h1 className="text-xl font-bold tracking-wider text-foreground">Logo</h1>
          <Button 
            onClick={() => setIsOpen(false)} 
            variant="ghost" 
            size="icon"
            className="hover:bg-muted"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        <nav className="px-3">
          <NavLinks />
        </nav>
      </div>
    </>
  );
};

export default Sidebar;