"use client"

import React from "react";
import Link from "next/link";

interface SidebarItemProps {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ href, label, icon }) => {
  return (
    <li className="hover:text-secondary text-dark p-2 transition-all duration-200">
      <Link href={href} className="flex items-center">
        {icon}
        {label}
      </Link>
    </li>
  );
};

export default SidebarItem;
