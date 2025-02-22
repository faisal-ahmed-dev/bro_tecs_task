import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
} from '@tanstack/react-table';
import { Edit, Trash2, ChevronUp, ChevronDown, Eye } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/card';

export type ColumnDef<T> = {
  accessorKey: keyof T;
  header: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  minWidth?: string;
  maxWidth?: string;
  render?: (value: any, row: T) => React.ReactNode;
};

interface EnhancedTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  isLoading?: boolean;
  emptyText?: string;
  onEdit?: (item: T) => void;
  onDelete?: (id: number) => void;
  onView?: (item: T) => void;
  className?: string;
}

const DataTable = <T extends { id: number }>({
  data,
  columns,
  isLoading = false,
  emptyText = 'No data available',
  onEdit,
  onDelete,
  onView,
  className,
}: EnhancedTableProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const columnHelper = createColumnHelper<T>();

  const tableColumns = [
    ...columns.map((col) =>
      columnHelper.accessor((row) => row[col.accessorKey], {
        header: col.header,
        cell: (info) =>
          col.render
            ? col.render(info.getValue(), info.row.original)
            : info.getValue(),
        enableSorting: col.sortable,
        size: parseInt(col.minWidth || '0'),
      })
    ),
    ...(onEdit || onDelete || onView
      ? [
          columnHelper.display({
            id: 'actions',
            header: '',
            size: 100,
            cell: (info) => (
              <div className="flex items-center justify-end gap-1">
                {onView && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onView(info.row.original)}
                    className="h-8 w-8 p-0"
                  >
                    <Eye className="w-4 h-4 text-blue-600" />
                  </Button>
                )}
                {onEdit && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(info.row.original)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                )}
                {onDelete && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(info.row.original.id)}
                    className="h-8 w-8 p-0"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                )}
              </div>
            ),
          }),
        ]
      : []),
  ];

  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Card className={`w-full ${className}`}>
      <div className="relative w-full">
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          <table className="w-full table-fixed">
            <thead className="bg-muted/50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const column = columns[header.index];
                    return (
                      <th
                        key={header.id}
                        className="px-4 py-3 text-sm font-medium text-left whitespace-nowrap sticky top-0 bg-muted/50"
                        onClick={header.column.getToggleSortingHandler()}
                        style={{
                          cursor: header.column.getCanSort() ? 'pointer' : 'default',
                          minWidth: column?.minWidth || 'auto',
                          maxWidth: column?.maxWidth || 'auto',
                        }}
                      >
                        <div className="flex items-center gap-1">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getCanSort() && (
                            <div className="flex flex-col">
                              <ChevronUp
                                className={`w-3 h-3 ${
                                  header.column.getIsSorted() === 'asc'
                                    ? 'text-primary'
                                    : 'text-muted-foreground'
                                }`}
                              />
                              <ChevronDown
                                className={`w-3 h-3 -mt-1 ${
                                  header.column.getIsSorted() === 'desc'
                                    ? 'text-primary'
                                    : 'text-muted-foreground'
                                }`}
                              />
                            </div>
                          )}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan={columns.length + (onEdit || onDelete || onView ? 1 : 0)}
                    className="p-4"
                  >
                    Loading...
                  </td>
                </tr>
              ) : table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-muted/10 transition-colors">
                    {row.getVisibleCells().map((cell, index) => {
                      const column = columns[index];
                      return (
                        <td
                          key={cell.id}
                          className="p-4 text-sm overflow-hidden text-ellipsis"
                          style={{
                            minWidth: column?.minWidth || 'auto',
                            maxWidth: column?.maxWidth || 'auto',
                          }}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      );
                    })}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length + (onEdit || onDelete || onView ? 1 : 0)}
                    className="p-8 text-center text-muted-foreground"
                  >
                    {emptyText}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t gap-4">
        <div className="flex items-center gap-2 order-2 sm:order-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
        <span className="text-sm text-muted-foreground order-1 sm:order-2">
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </span>
      </div>
    </Card>
  );
};

export default DataTable;