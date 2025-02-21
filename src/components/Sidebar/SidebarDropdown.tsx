"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { BsDot } from "react-icons/bs";

interface SidebarDropdownProps {
  label: string;
  icon: React.ReactNode;
  links: { href: string; label: string }[];
  defaultOpen?: boolean;
  defaultActiveLink?: string;
}

const SidebarDropdown: React.FC<SidebarDropdownProps> = ({
  label,
  icon,
  links,
  defaultOpen = false,
  defaultActiveLink = "",
}) => {
  const [open, setOpen] = useState(defaultOpen);
  const [activeLink, setActiveLink] = useState<string>(defaultActiveLink);

  const handleLinkClick = (href: string) => {
    setActiveLink(href);
  };

  return (
    <li className="py-2 px-1 transition-all duration-200">
      {/* Dropdown Toggle */}
      <button
        className={`flex items-center justify-between  w-full hover:text-secondary text-dark ${
          open ? "text-secondary border-l-4 rounded-l-sm  border-secondary" : ""
        }`}
        onClick={() => setOpen(!open)}
      >
        <span className="flex items-center">
          {icon}
          {label}
        </span>
        <FaChevronRight
          className={`transform transition-transform ${
            open ? "rotate-90 " : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <ul className="ml-2 mt-2 space-y-1">
          {links.map((link) => (
            <li
              key={link.href}
              className={`p-2 rounded-md transition-all duration-200 ${
                activeLink === link.href
                  ? "text-secondary"
                  : "hover:text-secondary"
              }`}
            >
              <Link
                href={link.href}
                onClick={() => handleLinkClick(link.href)}
                className="flex items-center space-x-2"
              >
                <BsDot
                  color={activeLink === link.href ? "#1E40AF" : "#D4D4D4"}
                  size={activeLink === link.href ? "1.52rem" : "1.5rem"}
                />
                <div>{link.label}</div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default SidebarDropdown;
