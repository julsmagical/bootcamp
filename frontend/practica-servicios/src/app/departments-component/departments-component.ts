import { inject, Component } from '@angular/core';
import { DepartmentsServices } from '../services/departments';
import { IDepartments } from '../interfaces/departments';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-departments-component',
  imports: [FormsModule],
  templateUrl: './departments-component.html',
  styleUrl: './departments-component.scss',
})
export class DepartmentsComponent {
  private _departmentService = inject(DepartmentsServices);
  departments: IDepartments[] = []; 
  buscarId: string = '';
  loading = false; 
  error = '';

  ngOnInit(){
    this.cargarDepartamentos();
  }

  cargarDepartamentos() {
    this.loading = true;
    this.error = '';

    console.log("prueba");
    this._departmentService.getAll().subscribe({
      next: (data) => {
        this.departments = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los departamentos';
        this.loading = false;
      }
    });
  }
}
