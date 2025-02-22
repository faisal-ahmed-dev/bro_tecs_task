import React from "react";
import { Search, X, Users, Building2 } from "lucide-react";
import Input from "./ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/Select";

interface EmployeeFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  departmentFilter: string;
  setDepartmentFilter: (value: string) => void;
  departments: string[];
  className?: string;
  variant?: 'default' | 'sheet';
}

const EmployeeFilters = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  departmentFilter,
  setDepartmentFilter,
  departments,
  className = "",
  variant = 'default'
}: EmployeeFiltersProps) => {
  const isSheet = variant === 'sheet';
  
  return (
    <div className={`
      bg-background
      ${isSheet ? 'p-0' : 'rounded-lg shadow-sm border p-4'}
      ${className}
    `}>
      <div className={`
        flex flex-col gap-4
        ${isSheet ? 'items-stretch' : 'sm:flex-row sm:items-center'}
      `}>
        {/* Search Input */}
        <div className="relative flex-1">
          <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" 
          />
          <Input
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`
              pl-9 pr-8
              ${isSheet ? 'w-full' : ''}
              placeholder:text-muted-foreground
            `}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filters Group */}
        <div className={`
          flex gap-3
          ${isSheet ? 'flex-col' : 'flex-row'}
          ${isSheet ? 'w-full' : 'sm:w-auto'}
        `}>
          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger 
              className={`
                h-10
                ${isSheet ? 'w-full' : 'w-[140px]'}
              `}
            >
              <Users className="mr-2 h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          {/* Department Filter */}
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger 
              className={`
                h-10
                ${isSheet ? 'w-full' : 'w-[160px]'}
              `}
            >
              <Building2 className="mr-2 h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active Filters Display */}
      {(statusFilter !== 'all' || departmentFilter !== 'all' || searchTerm) && (
        <div className="mt-3 flex flex-wrap gap-2">
          {searchTerm && (
            <div className="inline-flex items-center gap-1 text-sm bg-muted px-2 py-1 rounded">
              <span>Search: {searchTerm}</span>
              <button
                onClick={() => setSearchTerm('')}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {statusFilter !== 'all' && (
            <div className="inline-flex items-center gap-1 text-sm bg-muted px-2 py-1 rounded">
              <span>Status: {statusFilter}</span>
              <button
                onClick={() => setStatusFilter('all')}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {departmentFilter !== 'all' && (
            <div className="inline-flex items-center gap-1 text-sm bg-muted px-2 py-1 rounded">
              <span>Department: {departmentFilter}</span>
              <button
                onClick={() => setDepartmentFilter('all')}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EmployeeFilters;