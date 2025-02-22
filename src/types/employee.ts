// types/employee.ts
export interface Employee {
  id: number;
  profilePicture: string | null;
  name: string;
  phone: string;
  email: string;
  address: string;
  status?: string;
  department?: string;
}

export interface EmployeeResponse {
  data: Employee[];
  total: number;
}