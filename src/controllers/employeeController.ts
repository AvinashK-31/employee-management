import { Controller, Route, Get, Post, Put, Delete, Body, Path } from 'tsoa';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employeeService';
import { SalesforceService } from '../services/salesforceService';

@Route('employees')
export class EmployeeController extends Controller {
  private employeeService: EmployeeService = new EmployeeService();
  private salesforceService: SalesforceService = new SalesforceService();

  @Post()
  public async createEmployee(@Body() body: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>): Promise<Employee> {
    const employee = await this.employeeService.createEmployee(body);
    await this.salesforceService.syncContact({
      FirstName: employee.name.split(' ')[0],
      LastName: employee.name.split(' ').slice(1).join(' ') || 'LastName',
      Email: employee.email,
      Phone: employee.phone
    });
    return employee;
  }

  @Get()
  public async getEmployees(): Promise<Employee[]> {
    return this.employeeService.getEmployees();
  }

  @Get('{id}')
  public async getEmployeeById(@Path() id: number): Promise<Employee | null> {
    return this.employeeService.getEmployeeById(id);
  }

  @Put('{id}')
  public async updateEmployee(@Path() id: number, @Body() body: Partial<Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Employee> {
    const employee = await this.employeeService.updateEmployee(id, body);
    await this.salesforceService.syncContact({
      FirstName: employee.name.split(' ')[0],
      LastName: employee.name.split(' ').slice(1).join(' ') || 'LastName',
      Email: employee.email,
      Phone: employee.phone
    });
    return employee;
  }

  @Delete('{id}')
  public async deleteEmployee(@Path() id: number): Promise<Employee> {
    const employee = await this.employeeService.deleteEmployee(id);
    await this.salesforceService.deleteContact(employee.email);
    return employee;
  }
}
