import { ColumnDef } from "@/components/DataTable/DataTable";
import { Employee } from "@/types/employee";
import { Badge } from "@/components/ui/badge";

export const employeeColumns: ColumnDef<Employee>[] = [
  {
    accessorKey: "profilePicture",
    header: "Photo",
    render: (value, row) => (
      <div className="w-10 h-10 relative">
        {value ? (
          <img
            src={value}
            alt={row.name}
            className="rounded-full object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-500">
              {row.name[0]}
            </span>
          </div>
        )}
        <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ${
          row.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
        } border border-white`}></span>
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    render: (value, row) => (
      <div>
        <div className="font-medium">{value}</div>
        <div className="text-sm text-muted-foreground">{row.department}</div>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    render: (value) => (
      <a href={`mailto:${value}`} className="text-primary hover:underline">
        {value}
      </a>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "status",
    header: "Status",
    render: (value) => (
      <Badge variant={value === 'active' ? 'success' : 'secondary'}>
        {value}
      </Badge>
    ),
  },
];