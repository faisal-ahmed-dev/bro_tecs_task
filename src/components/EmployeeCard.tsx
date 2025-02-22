import { useState } from 'react';
import { Employee } from '@/types/employee';
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
  User
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge as UIBadge } from "@/components/ui/badge";

interface EmployeeCardProps {
  employee: Employee;
}

const getDepartmentColor = (department: string) => {
  const colors = {
    'Engineering': 'bg-blue-500/10 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300',
    'Marketing': 'bg-purple-500/10 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300',
    'Sales': 'bg-green-500/10 text-green-700 dark:bg-green-500/20 dark:text-green-300',
    'HR': 'bg-orange-500/10 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300',
    'default': 'bg-gray-500/10 text-gray-700 dark:bg-gray-500/20 dark:text-gray-300'
  };
  return colors[department] || colors.default;
};

export const EmployeeCard = ({ employee }: EmployeeCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <TooltipProvider>
      <>
        <div 
          onClick={() => setShowDetails(true)}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 w-64 h-40 p-4 cursor-pointer group relative border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-start space-x-3">
            {/* Profile Picture */}
            <div className="relative">
              {employee.profilePicture ? (
                <img
                  src={employee.profilePicture}
                  alt={employee.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary/10 dark:border-primary/20 group-hover:scale-105 transition-transform duration-200"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/10 to-primary/20 dark:from-primary/20 dark:to-primary/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                  <span className="text-xl font-semibold text-primary/70 dark:text-primary/80">
                    {employee.name[0]}
                  </span>
                </div>
              )}
              {/* Status Indicator */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="absolute bottom-0 right-0">
                    <Circle 
                      className={`w-4 h-4 ${
                        employee.status === 'active' 
                          ? 'text-green-500 dark:text-green-400' 
                          : 'text-gray-400 dark:text-gray-500'
                      } fill-current`}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="capitalize">{employee.status}</p>
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Basic Info */}
            <div className="flex-1 space-y-2">
              <div>
                <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
                  {employee.name}
                </h3>
                <UIBadge 
                  variant="secondary" 
                  className={`mt-1 ${getDepartmentColor(employee.department)}`}
                >
                  {employee.department}
                </UIBadge>
              </div>
              
              <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                <p className="flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  <span className="truncate">{employee.email}</span>
                </p>
                <p className="flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  <span>{employee.phone}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="absolute bottom-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={e => {
                  e.stopPropagation();
                  window.location.href = `mailto:${employee.email}`;
                }} className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
                  <Mail className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Send Email</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={e => {
                  e.stopPropagation();
                  window.location.href = `tel:${employee.phone}`;
                }} className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
                  <Phone className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Call</TooltipContent>
            </Tooltip>
          </div>
        </div>

        <Dialog open={showDetails} onOpenChange={setShowDetails}>
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
                        employee.status === 'active' 
                          ? 'text-green-500 dark:text-green-400' 
                          : 'text-gray-400 dark:text-gray-500'
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
                    { icon: Mail, label: 'Email', value: employee.email, link: `mailto:${employee.email}` },
                    { icon: Phone, label: 'Phone', value: employee.phone, link: `tel:${employee.phone}` },
                    { icon: MapPin, label: 'Address', value: employee.address },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800/50">
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
                    { icon: Building2, label: 'Department', value: employee.department },
                    { icon: Badge, label: 'Employee ID', value: `EMP-${employee.id.toString().padStart(4, '0')}` },
                    { icon: User, label: 'Status', value: employee.status, 
                      badge: true, 
                      badgeColor: employee.status === 'active' 
                        ? 'bg-green-500/10 text-green-700 dark:bg-green-500/20 dark:text-green-300'
                        : 'bg-gray-500/10 text-gray-700 dark:bg-gray-500/20 dark:text-gray-300'
                    },
                    // Example additional fields (you'd need to add these to your Employee type)
                    { icon: Calendar, label: 'Join Date', value: 'Jan 15, 2023' },
                    { icon: Clock, label: 'Work Schedule', value: 'Mon-Fri, 9:00-17:00' },
                    { icon: Briefcase, label: 'Employment Type', value: 'Full-time' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800/50">
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
      </>
    </TooltipProvider>
  );
};

export default EmployeeCard;