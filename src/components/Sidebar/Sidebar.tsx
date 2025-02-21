"use client";
import React, { useState } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import Link from "next/link";
import {
  Home as DashboardIcon,
  ShoppingCart as PurchaseIcon,
  Building as BusinessUnitIcon,
  List as CatalogIcon,
  Users as UserIcon,
  Settings as SettingsIcon,
} from "lucide-react";
import Button from "../ui/Button";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:w-64 h-screen flex flex-col bg-background shadow-md text-foreground">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <div className="p-4 ml-1 text-2xl font-bold tracking-widest text-foreground">
          GENPOS
        </div>
        <nav className="mt-4 text-sm flex-1">
          <Accordion type="multiple" defaultValue={["business-unit"]}>
            <ul>
              {/* Dashboard */}
              <li className="mb-2">
                <Link href="/" className="flex items-center p-2 rounded-md hover:bg-muted">
                  <DashboardIcon className="mx-3 w-5 h-5" />
                  Dashboard
                </Link>
              </li>

              {/* Purchase Dropdown */}
              <AccordionItem value="purchase">
                <AccordionTrigger className="flex items-center p-2 rounded-md hover:bg-muted">
                  <PurchaseIcon className="mx-3 w-5 h-5" />
                  Purchase
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="pl-8">
                    <li className="mb-1">
                      <Link href="/purchase/orders" className="block p-2 rounded-md hover:bg-muted">
                        Orders
                      </Link>
                    </li>
                    <li className="mb-1">
                      <Link href="/purchase/invoices" className="block p-2 rounded-md hover:bg-muted">
                        Invoices
                      </Link>
                    </li>
                    <li>
                      <Link href="/purchase/suppliers" className="block p-2 rounded-md hover:bg-muted">
                        Suppliers
                      </Link>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* Business Unit Dropdown */}
              <AccordionItem value="business-unit">
                <AccordionTrigger className="flex items-center p-2 rounded-md hover:bg-muted">
                  <BusinessUnitIcon className="mx-3 w-5 h-5" />
                  Business Unit
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="pl-8">
                    <li className="mb-1">
                      <Link href="/business/departments" className="block p-2 rounded-md hover:bg-muted">
                        Groups
                      </Link>
                    </li>
                    <li className="mb-1">
                      <Link href="/companies" className="block p-2 rounded-md hover:bg-muted">
                        Companies
                      </Link>
                    </li>
                    <li className="mb-1">
                      <Link href="/business/brands" className="block p-2 rounded-md hover:bg-muted">
                        Brands
                      </Link>
                    </li>
                    <li className="mb-1">
                      <Link href="/business/outlets" className="block p-2 rounded-md hover:bg-muted">
                        Outlets
                      </Link>
                    </li>
                    <li>
                      <Link href="/business/warehouses" className="block p-2 rounded-md hover:bg-muted">
                        Warehouses
                      </Link>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </ul>
          </Accordion>
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <Button
          onClick={() => setIsOpen(true)}
          variant="outline"
          size="icon"
          className="m-2"
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
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-background shadow-lg transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-50`}
        >
          <div className="p-4 text-xl font-bold border-b flex justify-between items-center text-foreground">
            GENPOS
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>
          <nav className="mt-4 flex-1">
            <ul>
              <li className="mb-2">
                <Link href="/" className="flex items-center p-2 rounded-md hover:bg-muted">
                  <DashboardIcon className="mx-3 w-5 h-5" />
                  Dashboard
                </Link>
              </li>
              <Accordion type="multiple" defaultValue={["business-unit"]}>
                <AccordionItem value="purchase">
                  <AccordionTrigger className="flex items-center p-2 rounded-md hover:bg-muted">
                    <PurchaseIcon className="mx-3 w-5 h-5" />
                    Purchase
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="pl-8">
                      <li className="mb-1">
                        <Link href="/purchase/orders" className="block p-2 rounded-md hover:bg-muted">
                          Orders
                        </Link>
                      </li>
                      <li className="mb-1">
                        <Link href="/purchase/invoices" className="block p-2 rounded-md hover:bg-muted">
                          Invoices
                        </Link>
                      </li>
                      <li>
                        <Link href="/purchase/suppliers" className="block p-2 rounded-md hover:bg-muted">
                          Suppliers
                        </Link>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </ul>
          </nav>
        </div>
        {isOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setIsOpen(false)}
          ></div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;