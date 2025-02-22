import { useState } from 'react';
import { Employee } from '@/types/employee';
import { Edit, Mail, Map, Phone, Trash2, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface EmployeeCardProps {
  employee: Employee;
}

export const EmployeeCard = ({ employee }: EmployeeCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-all duration-300 w-40 h-40 flex flex-col justify-between"
      >
        <div className="flex flex-col items-center space-y-2">
          <div className="relative w-16 h-16">
            {employee.profilePicture ? (
              <img
                src={employee.profilePicture}
                alt={employee.name}
                className="w-full h-full rounded-full object-cover border-2 border-primary/10"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-lg font-bold text-gray-500">
                  {employee.name[0]}
                </span>
              </div>
            )}
            <span
              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
                employee.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
              } border-2 border-white`}
            ></span>
          </div>

          <h3 className="text-base font-semibold text-gray-800 text-center truncate w-full">
            {employee.name}
          </h3>

          <div className="text-xs text-gray-600 text-center space-y-1">
            <p className="flex items-center justify-center gap-1 truncate">
              <Phone className="w-3 h-3" />
              {employee.phone}
            </p>
            <p className="flex items-center justify-center gap-1 truncate">
              <Mail className="w-3 h-3" />
              <a href={`mailto:${employee.email}`} className="hover:underline">
                {employee.email}
              </a>
            </p>
          </div>
        </div>
      </motion.div>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Employee Details</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3 py-3 text-sm text-gray-700">
            <div className="flex justify-center">
              <div className="w-24 h-24">
                {employee.profilePicture ? (
                  <img
                    src={employee.profilePicture}
                    alt={employee.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-500">
                      {employee.name[0]}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              {[
                { label: 'Name', value: employee.name },
                { label: 'Email', value: employee.email },
                { label: 'Phone', value: employee.phone },
                { label: 'Address', value: employee.address },
                { label: 'Department', value: employee.department },
                { label: 'Status', value: employee.status },
              ].map((item, index) => (
                <div key={index}>
                  <label className="text-xs font-medium text-gray-500">
                    {item.label}
                  </label>
                  <p className="text-sm font-medium truncate">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
