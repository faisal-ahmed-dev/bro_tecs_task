import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './Select';

interface PaginationProps {
  start: number;
  length: number;
  totalRecords: number;
  page: number;
  pageSize: number;
  pageSizes: number[];
  totalPages: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newSize: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  start,
  length,
  totalRecords,
  page,
  pageSize,
  pageSizes,
  totalPages,
  onPageChange,
  onPageSizeChange,
}) => {
  const renderPageButtons = () => {
    const pageButtons = [];
    const startPage = Math.max(page - 2, 1);
    const endPage = Math.min(page + 2, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3 py-1 rounded ${
            i === page ? 'bg-secondary text-white' : 'bg-white'
          }`}
        >
          {i}
        </button>
      );
    }
    return pageButtons;
  };

  return (
    <div className="flex flex-wrap items-center justify-between p-4 gap-4">
      <div className="flex items-center space-x-2">
        <span>Rows per page</span>
        <Select
          value={pageSize.toString()}
          onValueChange={(value) => onPageSizeChange(parseInt(value, 10))}
        >
          <SelectTrigger className="w-[80px] bg-gray-200">
            <SelectValue placeholder={pageSize.toString()} />
          </SelectTrigger>
          <SelectContent>
            {pageSizes.map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span>entries</span>
      </div>

      <div className="text-sm">
        {length > 0 && (
          <>
            {start + 1} - {start + length} of {totalRecords} items
          </>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className={`px-3 py-1 bg-white rounded ${
            page === 1 ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          <ChevronLeft />
        </button>

        {renderPageButtons()}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className={`px-3 py-1 bg-white rounded ${
            page >= totalPages ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default React.memo(Pagination);
