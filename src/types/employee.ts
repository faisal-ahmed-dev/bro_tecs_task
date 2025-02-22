// types/employee.ts
export interface Employee {
  id: string;
  profilePicture: string | null;
  name: string;
  phone: string;
  email: string;
  address: string;
}

export interface EmployeeResponse {
  data: Employee[];
  total: number;
}