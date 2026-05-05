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

  agregarDepartamento(){
    const payload: Partial<IDepartments> = {
      name: 'Backend Department',
      managerName: 'Alejandro Medina',
      description: 'departamento de backend'
    };

    this._departmentService.createDepartment(payload).subscribe({
      next: (nuevo) => {
        this.departments = [...this.departments, nuevo];
      },
      error: () => {
        this.error = 'Error al crear el departamento';
      }
    });
  }

  editarDepartamento(id: string){
    const payload: Partial<IDepartments> = {
      name: 'Backend Department Editado',
      managerName: 'Alejandro Medina editado',
      description: 'departamento de backend'
    };

    this._departmentService.updateDepartment(id, payload).subscribe({
      next: (actualizado) => {
        this.departments = this.departments.map(e =>
          e.id === id ? actualizado : e
        );
      },
      error: () => {
        this.error = 'Error al editar el departamento';
      }
    });
  }

  eliminarDepartamento(id: string){
    this._departmentService.deleteDepartment(id).subscribe({
      next: () => {
        this.departments = this.departments.filter(e => e.id !== id);
      },
      error: () => {
        this.error = 'Error al eliminar el departamento';
      }
    });
  }
}
