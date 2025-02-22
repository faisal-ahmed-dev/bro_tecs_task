// components/ui/EmployeeTable.tsx
import { ColumnDef } from "@tanstack/react-table";

interface EmployeeTableProps {
  data: Employee[];
  columns: ColumnDef<Employee>[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

const EmployeeTable = ({ data, columns, onEdit, onDelete }: EmployeeTableProps) => {
  return (
    <div className="rounded-lg border overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            {columns.map(column => (
              <th key={column.id} className="px-4 py-3 text-left text-sm font-medium">
                {column.header}
              </th>
            ))}
            <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(employee => (
            <tr key={employee.id} className="hover:bg-gray-50 border-b">
              <td className="px-4 py-4">
                {employee.profilePicture ? (
                  <img src={employee.profilePicture} className="w-10 h-10 rounded-full" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200" />
                )}
              </td>
              <td className="px-4 py-4">{employee.name}</td>
              <td className="px-4 py-4">{employee.phone}</td>
              <td className="px-4 py-4">{employee.email}</td>
              <td className="px-4 py-4">{employee.address}</td>
              <td className="px-4 py-4 text-right space-x-2">
                <button 
                  onClick={() => onEdit(employee)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(employee.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};