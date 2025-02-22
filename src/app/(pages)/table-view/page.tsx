"use client";

import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import DataTable from '@/components/DataTable/DataTable';
import { employeeColumns } from '@/components/employees/columns';
import { Plus, Filter } from 'lucide-react';
import { Employee } from '@/types/employee';
import EmployeeForm from '@/components/employees/EmployeeForm';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { fetchEmployees } from '@/services/employeeApi';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import EmployeeFilters from '@/components/EmployeeFilters';

const TablePage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [departments, setDepartments] = useState<string[]>([]);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<number | null>(null);
  const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const response = await fetchEmployees();
        setEmployees(response.data);
        const uniqueDepartments = Array.from(new Set(response.data.map(e => e.department))).filter(Boolean) as string[];
        setDepartments(uniqueDepartments);
      } catch (error) {
        toast.error("Error loading employees");
      } finally {
        setLoading(false);
      }
    };
    loadEmployees();
  }, []);

  const handleDelete = (id: number) => {
    setEmployeeToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (employeeToDelete) {
      setEmployees(prev => prev.filter(emp => emp.id !== employeeToDelete));
      toast.success("Employee deleted successfully");
      setDeleteConfirmOpen(false);
    }
  };

  const handleFormSubmit = (values: Omit<Employee, 'id'>) => {
    const newEmployee: Employee = {
      ...values,
      id: selectedEmployee?.id || Date.now(),
    };
  
    setEmployees((prev) => {
      const exists = prev.some((emp) => emp.id === newEmployee.id);
      if (exists) {
        toast.success("Employee updated successfully");
        return prev.map((emp) => (emp.id === newEmployee.id ? newEmployee : emp));
      } else {
        toast.success("Employee added successfully");
        return [...prev, newEmployee];
      }
    });
    setIsFormOpen(false);
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      employee.email.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      employee.phone.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  // Mobile Filters Component
  const MobileFilters = () => (
    <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
      <SheetContent side="right" className="w-full ">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          <EmployeeFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            departmentFilter={departmentFilter}
            setDepartmentFilter={setDepartmentFilter}
            departments={departments}
            className="flex flex-col gap-4"
          />
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-xl md:text-2xl font-semibold">Employee Management</h1>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button 
            onClick={() => setIsFilterSheetOpen(true)} 
            variant="outline"
            className="sm:hidden flex-1"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button 
            onClick={() => {
              setSelectedEmployee(null);
              setIsFormOpen(true);
            }}
            className="flex-1 sm:flex-none"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        </div>
      </div>

      {/* Desktop Filters */}
      <div className="hidden sm:block">
        <EmployeeFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          departmentFilter={departmentFilter}
          setDepartmentFilter={setDepartmentFilter}
          departments={departments}
        />
      </div>

      {/* Mobile Filters Sheet */}
      <MobileFilters />

      {/* Data Table */}
      <div className="overflow-x-auto">
        <DataTable<Employee>
          data={filteredEmployees}
          columns={employeeColumns}
          onEdit={(employee) => {
            setSelectedEmployee(employee);
            setIsFormOpen(true);
          }}
          onDelete={handleDelete}
          isLoading={loading}
          emptyText={
            debouncedSearch || statusFilter !== 'all' || departmentFilter !== 'all'
              ? "No employees found matching your criteria"
              : "No employees added yet"
          }
        />
      </div>

      {/* Forms and Dialogs */}
      <EmployeeForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        employee={selectedEmployee}
        onSubmit={handleFormSubmit}
      />

      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the employee data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel className="w-full sm:w-auto">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="w-full sm:w-auto"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TablePage;