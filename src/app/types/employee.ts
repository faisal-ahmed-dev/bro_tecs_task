// types/employee.ts
export interface Employee {
  id: number;
  profilePicture: string | null; 
  name: string;
  phone: string;
  email: string;
  address: string;
  active: boolean;
}

export interface EmployeeResponse {
  data: {
    data: Employee[];
    draw: any;
    recordsFiltered: number;
    recordsTotal: number;
  };
  message: string | null;
  errors: any[];
  validationErrors: Record<string, any>;
}

export interface InitialDataResponse {
  data: {
    searchGroupId: number;
    searchEmployeeName: string | null;
    searchEmployeeEmail: string | null;
    searchActiveId: number;
    availableGroups: FilterGroup[];
    availableActiveOptions: FilterGroup[];
    page: number;
    pageSize: number;
    availablePageSizes: string[];
    draw: any;
    start: number;
    length: number;
  };
  message: string | null;
  errors: any[];
  validationErrors: Record<string, any>;
}

export interface FilterParams {
  searchGroupId: number;
  searchEmployeeName: string | null;
  searchEmployeeEmail: string | null;
  searchActiveId: number;
  page: number;
  pageSize: number;
  availablePageSizes: string[];
  draw: any;
  start: number;
  length: number;
}

export interface FilterGroup {
  disabled: boolean;
  group: string | null;
  selected: boolean;
  text: string;
  value: string;
}