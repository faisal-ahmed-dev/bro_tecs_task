// components/employees/EmployeeDetails.tsx
"use client";

import {
  Mail,
  Phone,
  Building2,
  MapPin,
  Circle,
  Calendar,
  Clock,
  Briefcase,
  Badge,
  User,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge as UIBadge } from "@/components/ui/badge";
import Image from "next/image";
import { Employee } from "@/types/employee";

interface EmployeeDetailsProps {
  employee: Employee;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const colors: Record<string, string> = {
  Engineering: "bg-blue-500/10 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300",
  Marketing: "bg-purple-500/10 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300",
  Sales: "bg-green-500/10 text-green-700 dark:bg-green-500/20 dark:text-green-300",
  HR: "bg-orange-500/10 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300",
  default: "bg-gray-500/10 text-gray-700 dark:bg-gray-500/20 dark:text-gray-300",
};

const getDepartmentColor = (department: string | undefined) => {
  if (!department) return colors.default;
  return colors[department] || colors.default;
};

export const EmployeeDetails = ({ employee, open, onOpenChange }: EmployeeDetailsProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Employee Profile</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="info">Information</TabsTrigger>
            <TabsTrigger value="work">Work Details</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4">
            <div className="flex items-center space-x-4 pt-4">
              <div className="relative">
                {employee.profilePicture ? (
                  <img
                    src={employee.profilePicture}
                    alt={employee.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-primary/10 dark:border-primary/20"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/10 to-primary/20 dark:from-primary/20 dark:to-primary/30 flex items-center justify-center">
                    <span className="text-3xl font-bold text-primary/70 dark:text-primary/80">
                      {employee.name[0]}
                    </span>
                  </div>
                )}
                <Circle
                  className={`absolute bottom-0 right-0 w-6 h-6 ${
                    employee.status === "active"
                      ? "text-green-500 dark:text-green-400"
                      : "text-gray-400 dark:text-gray-500"
                  } fill-current`}
                />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {employee.name}
                </h2>
                <UIBadge
                  variant="secondary"
                  className={`mt-2 ${getDepartmentColor(employee.department)}`}
                >
                  {employee.department}
                </UIBadge>
              </div>
            </div>

            <div className="grid gap-3">
              {[
                { icon: Mail, label: "Email", value: employee.email, link: `mailto:${employee.email}` },
                { icon: Phone, label: "Phone", value: employee.phone, link: `tel:${employee.phone}` },
                { icon: MapPin, label: "Address", value: employee.address },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                >
                  <item.icon className="w-4 h-4 text-gray-500 dark:text-gray-400 mt-1" />
                  <div>
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {item.label}
                    </label>
                    {item.link ? (
                      <a
                        href={item.link}
                        className="block text-sm font-medium text-primary hover:underline dark:text-primary-400"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="work" className="space-y-4 pt-4">
            <div className="grid gap-3">
              {[
                { icon: Building2, label: "Department", value: employee.department },
                { icon: Badge, label: "Employee ID", value: `EMP-${employee.id.toString().padStart(4, "0")}` },
                {
                  icon: User,
                  label: "Status",
                  value: employee.status,
                  badge: true,
                  badgeColor:
                    employee.status === "active"
                      ? "bg-green-500/10 text-green-700 dark:bg-green-500/20 dark:text-green-300"
                      : "bg-gray-500/10 text-gray-700 dark:bg-gray-500/20 dark:text-gray-300",
                },
                { icon: Calendar, label: "Join Date", value: "Jan 15, 2023" },
                { icon: Clock, label: "Work Schedule", value: "Mon-Fri, 9:00-17:00" },
                { icon: Briefcase, label: "Employment Type", value: "Full-time" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                >
                  <item.icon className="w-4 h-4 text-gray-500 dark:text-gray-400 mt-1" />
                  <div>
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {item.label}
                    </label>
                    {item.badge ? (
                      <UIBadge
                        variant="secondary"
                        className={`mt-1 capitalize ${item.badgeColor}`}
                      >
                        {item.value}
                      </UIBadge>
                    ) : (
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};