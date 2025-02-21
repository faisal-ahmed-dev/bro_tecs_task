import React from "react";
import Image from "next/image";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Employee } from "../../app/types/employee";
import { Check, Pencil, Trash2, X } from "lucide-react";
import Spinner from "./Spinner";

interface TableProps {
  employees: Employee[];
  loading: boolean;
}

const Table: React.FC<TableProps> = ({ employees, loading }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse border border-gray-200">
        <thead className="bg-gray-100 text-xs font-medium text-gray-500">
          <tr>
            <th className="px-4 py-2 text-left">PROFILE</th>
            <th className="px-4 py-2 text-left">NAME</th>
            <th className="px-4 py-2 text-left">PHONE</th>
            <th className="px-4 py-2 text-left">EMAIL</th>
            <th className="px-4 py-2 text-left">ADDRESS</th>
            <th className="px-4 py-2 text-left">STATUS</th>
            <th className="px-4 py-2 text-left">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={7} className="px-4 py-2 text-center">
                <Spinner />
              </td>
            </tr>
          ) : employees.length > 0 ? (
            employees.map((employee) => (
              <tr key={employee.id} className="border-b border-gray-200">
                <td className="px-4 py-2">
                  <Image
                    src={employee.profilePicture || "/default-profile.png"}
                    alt={`${employee.name}'s profile`}
                    width={50}
                    height={50}
                    className="object-cover rounded-full"
                  />
                </td>
                <td className="px-4 py-2 font-semibold">{employee.name}</td>
                <td className="px-4 py-2">{employee.phone}</td>
                <td className="px-4 py-2">{employee.email}</td>
                <td className="px-4 py-2">{employee.address}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 text-sm font-semibold rounded ${
                      employee.active ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    }`}
                  >
                    {employee.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button className="text-blue-600 border border-blue-300 rounded-md p-1 hover:bg-blue-100">
                    <Pencil size={15} />
                  </button>
                  <button className="text-red-600 border border-red-300 rounded-md p-1 hover:bg-red-100">
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="px-4 py-2 text-center">
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(Table);