// components/ui/DataTable/DataTable.tsx
import { cn } from "@/lib/utils";

import { Edit, Trash2 } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/Button";

export type ColumnDef<T> = {
  accessorKey: keyof T;
  header: string;
  align?: "left" | "center" | "right";
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
};

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  isLoading?: boolean;
  emptyText?: string;
  onEdit?: (item: T) => void;
  onDelete?: (id: string | number) => void;
  variant?: "default" | "bordered";
  className?: string;
}

const DataTable = <T extends { id: string | number }>({
  data,
  columns,
  isLoading = false,
  emptyText = "No data available",
  onEdit,
  onDelete,
  variant = "default",
  className,
}: DataTableProps<T>) => {
  return (
    <div className={cn("rounded-lg border overflow-hidden", className)}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead className={cn(variant === "bordered" && "border-b", "bg-muted/50")}>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.accessorKey as string}
                  className={cn(
                    "px-4 py-3 text-sm font-medium text-left",
                    column.align === "center" && "text-center",
                    column.align === "right" && "text-right",
                    variant === "bordered" && "border-r last:border-r-0"
                  )}
                >
                  {column.header}
                </th>
              ))}
              {(onEdit || onDelete) && <th className="w-[120px] px-4 py-3">Actions</th>}
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length + 1}>
                  <div className="p-4 space-y-2">
                    {Array(5).fill(0).map((_, i) => (
                      <Skeleton key={i} className="w-full h-12" />
                    ))}
                  </div>
                </td>
              </tr>
            ) : data.length > 0 ? (
              data.map((row) => (
                <tr
                  key={row.id}
                  className={cn(
                    variant === "bordered" && "border-b",
                    "hover:bg-muted/10 transition-colors"
                  )}
                >
                  {columns.map((column) => {
                    const value = row[column.accessorKey];
                    return (
                      <td
                        key={column.accessorKey as string}
                        className={cn(
                          "p-4 text-sm",
                          column.align === "center" && "text-center",
                          column.align === "right" && "text-right",
                          variant === "bordered" && "border-r last:border-r-0"
                        )}
                      >
                        {column.render ? column.render(value, row) : (value as React.ReactNode)}
                      </td>
                    );
                  })}

                  {(onEdit || onDelete) && (
                    <td className="p-4 space-x-2">
                      {onEdit && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit(row)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      )}
                      {onDelete && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDelete(row.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      )}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1}>
                  <div className="p-8 text-center text-muted-foreground">
                    {emptyText}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;