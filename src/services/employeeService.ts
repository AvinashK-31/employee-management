import { prisma } from '../config';
import { Employee } from '../models/employee';

export class EmployeeService {
  async createEmployee(data: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>): Promise<Employee> {
    return await prisma.employee.create({
      data
    });
  }

  async getEmployees(): Promise<Employee[]> {
    return await prisma.employee.findMany();
  }

  async getEmployeeById(id: number): Promise<Employee | null> {
    return await prisma.employee.findUnique({
      where: { id }
    });
  }

  async updateEmployee(id: number, data: Partial<Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Employee> {
    return await prisma.employee.update({
      where: { id },
      data
    });
  }

  async deleteEmployee(id: number): Promise<Employee> {
    return await prisma.employee.delete({
      where: { id }
    });
  }
}
