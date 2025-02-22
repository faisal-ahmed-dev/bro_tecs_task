import { cn } from "@/lib/utils";
import { Edit, Trash2, ChevronRight } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/Button";
import { useRef, useState, useEffect } from "react";

export type ColumnDef<T> = {
  accessorKey: keyof T;
  header: string;
  align?: "left" | "center" | "right";
  sortable?: boolean;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  priority?: number; // New prop for controlling mobile visibility
};

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  isLoading?: boolean;
  emptyText?: string;
  onEdit?: (item: T) => void;
  onDelete?: (id: number) => void;
  variant?: "default" | "bordered";
  className?: string;
}

const DataTable = <T extends { id: number }>({
  data,
  columns,
  isLoading = false,
  emptyText = "No data available",
  onEdit,
  onDelete,
  variant = "default",
  className,
}: DataTableProps<T>) => {
  const [hasScroll, setHasScroll] = useState(false);
  const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);
  const [isScrolledFromStart, setIsScrolledFromStart] = useState(false);
  const tableWrapperRef = useRef<HTMLDivElement>(null);

  // Check for scroll overflow
  useEffect(() => {
    const checkScroll = () => {
      if (tableWrapperRef.current) {
        const { scrollWidth, clientWidth, scrollLeft } = tableWrapperRef.current;
        setHasScroll(scrollWidth > clientWidth);
        setIsScrolledToEnd(scrollLeft + clientWidth >= scrollWidth - 10);
        setIsScrolledFromStart(scrollLeft > 0);
      }
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [data]);

  // Handle scroll events
  const handleScroll = () => {
    if (tableWrapperRef.current) {
      const { scrollWidth, clientWidth, scrollLeft } = tableWrapperRef.current;
      setIsScrolledToEnd(scrollLeft + clientWidth >= scrollWidth - 10);
      setIsScrolledFromStart(scrollLeft > 0);
    }
  };

  return (
    <div className={cn("rounded-lg border relative", className)}>
      {hasScroll && (
        <>
          {!isScrolledFromStart && (
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
          )}
          {!isScrolledToEnd && (
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
          )}
        </>
      )}

      <div 
        ref={tableWrapperRef}
        className="overflow-x-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent"
        onScroll={handleScroll}
      >
        <table className="w-full min-w-[600px]">
          <thead 
            className={cn(
              "bg-muted/50 sticky top-0 z-20",
              variant === "bordered" && "border-b"
            )}
          >
            <tr>
              {columns.map((column) => (
                <th
                  key={column.accessorKey as string}
                  className={cn(
                    "px-4 py-3 text-sm font-medium text-left whitespace-nowrap",
                    column.align === "center" && "text-center",
                    column.align === "right" && "text-right",
                    variant === "bordered" && "border-r last:border-r-0"
                  )}
                >
                  {column.header}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="w-[100px] px-4 py-3 text-right">Actions</th>
              )}
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}>
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
                          variant === "bordered" && "border-r last:border-r-0",
                          "whitespace-nowrap"
                        )}
                      >
                        {column.render ? column.render(value, row) : (value as React.ReactNode)}
                      </td>
                    );
                  })}

                  {(onEdit || onDelete) && (
                    <td className="p-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        {onEdit && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(row)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        )}
                        {onDelete && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDelete(row.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td 
                  colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                  className="p-8 text-center text-muted-foreground"
                >
                  {emptyText}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {hasScroll && !isScrolledFromStart && (
        <div className="md:hidden absolute bottom-4 right-4 bg-primary text-primary-foreground rounded-full p-2 shadow-lg animate-bounce">
          <ChevronRight className="w-4 h-4" />
        </div>
      )}
    </div>
  );
};

export default DataTable;