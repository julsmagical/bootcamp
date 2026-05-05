import { inject, Component } from '@angular/core';
import { EmployeesServices } from '../services/employees';
import { IEmployee } from '../interfaces/employees';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employees-component',
  imports: [FormsModule],
  templateUrl: './employees-component.html',
  styleUrl: './employees-component.scss',
})
export class EmployeesComponent {
  private _employeeService = inject(EmployeesServices);
  employees: IEmployee[] = [];
  buscarId: string = '';
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

  agregarEmpleado(){
    const payload: Partial<IEmployee> = {
      name: 'Martin Bastidas',
      email: 'martin@gmail.com',
      phone: '555-9876',
      position: 'Frontend Developer',
      department: 'Engineering',
      salary: '1200'
    };

    this._employeeService.createEmployee(payload).subscribe({
      next: (nuevo) => {
        this.employees = [...this.employees, nuevo];
      },
      error: () => {
        this.error = 'Error al crear el empleado';
      }
    });
  }

  editarEmpleado(id: string){
    const payload: Partial<IEmployee> = {
      name: 'Martin Bastidas',
      email: 'martin.editado@gmail.com',
      phone: '555-9876',
      position: 'Frontend Developer',
      department: 'Engineering',
      salary: '2000'
    };

    this._employeeService.updateEmployee(id, payload).subscribe({
      next: (actualizado) => {
        this.employees = this.employees.map(e =>
          e.id === id ? actualizado : e
        );
      },
      error: () => {
        this.error = 'Error al editar el empleado';
      }
    });
  }

  eliminarEmpleado(id: string){
    this._employeeService.deleteEmployee(id).subscribe({
      next: () => {
        this.employees = this.employees.filter(e => e.id !== id);
      },
      error: () => {
        this.error = 'Error al eliminar el empleado';
      }
    });
  }
}
