import { inject, Component } from '@angular/core';
import { EmployeesServices } from '../services/employees';
import { IEmployee } from '../interfaces/employees';

@Component({
  selector: 'app-employees-component',
  imports: [],
  templateUrl: './employees-component.html',
  styleUrl: './employees-component.scss',
})
export class EmployeesComponent {
  private _employeeService = inject(EmployeesServices);
    employees: IEmployee[] = []; 
    loading = false; 
    error = '';
  
    ngOnInit(){
      this.cargarEmpleados();
    }
  
    cargarEmpleados() {
      this.loading = true;
      this.error = '';
  
      this._employeeService.getAll().subscribe({
        next: (data) => {
          this.employees = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Error al cargar los empleados';
          this.loading = false;
        }
      });
    }
}
