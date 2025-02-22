"use client";

import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import DataTable from '@/components/DataTable/DataTable';
import { employeeColumns } from '@/components/employees/columns';
import { Plus, Search, Filter } from 'lucide-react';
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
import { fetchEmployees } from '@/services/employeeApi';
import toast, { Toaster } from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';


const TablePage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<string | null>(null);
  const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const response = await fetchEmployees();
        setEmployees(response.data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load employees. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };
    loadEmployees();
  }, [toast]);

  const handleDelete = (id: string) => {
    setEmployeeToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (employeeToDelete) {
      setEmployees(prev => prev.filter(emp => emp.id !== employeeToDelete));
      toast({
        title: "Success",
        description: "Employee has been deleted successfully.",
      });
      setDeleteConfirmOpen(false);
    }
  };

  const handleFormSubmit = (employee: Employee) => {
    setEmployees(prev => {
      const exists = prev.some(emp => emp.id === employee.id);
      if (exists) {
        toast({
          title: "Success",
          description: "Employee details updated successfully.",
        });
        return prev.map(emp => emp.id === employee.id ? employee : emp);
      } else {
        toast({
          title: "Success",
          description: "New employee added successfully.",
        });
        return [...prev, employee];
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
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Employee Management</h1>
        <Button onClick={() => {
          setSelectedEmployee(null);
          setIsFormOpen(true);
        }}>
          <Plus className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DataTable<Employee>
        data={filteredEmployees}
        columns={employeeColumns}
        onEdit={(employee) => {
          setSelectedEmployee(employee);
          setIsFormOpen(true);
        }}
        onDelete={handleDelete}
        variant="bordered"
        isLoading={loading}
        emptyText={
          debouncedSearch || statusFilter !== 'all'
            ? "No employees found matching your criteria"
            : "No employees added yet"
        }
      />

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
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TablePage;