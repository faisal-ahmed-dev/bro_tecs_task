import { dummyEmployees } from "@/data/employeeData";
import {  EmployeeResponse } from "@/types/employee";



export const fetchEmployees = async (): Promise<EmployeeResponse> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return { data: dummyEmployees, total: dummyEmployees.length };
};
