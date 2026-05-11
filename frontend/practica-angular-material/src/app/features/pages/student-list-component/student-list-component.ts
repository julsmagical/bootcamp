import { inject, Component, ChangeDetectionStrategy } from '@angular/core';
//angular material
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; //no implementado
//interface y services
import { ServiceStudentComponent } from '../../services/service-student-component';
import { IStudent } from '../../interfaces/students';

@Component({
  selector: 'app-student-list-component',
  templateUrl: './student-list-component.html',
  styleUrl: './student-list-component.scss',
  imports: [MatCardModule, MatButtonModule, MatListModule, MatProgressSpinnerModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentListComponent {
  private _studentService = inject(ServiceStudentComponent);
  students: IStudent[] = [];
  buscarId: string = '';
  loading = false; 
  error = '';
  
  ngOnInit(){
    this.cargarEstudiantes();
  }
  
  cargarEstudiantes() {
    this.loading = true;
    this.error = '';

    this._studentService.getAll().subscribe({
      next: (data) => {
        this.students = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los estudiantes';
        this.loading = false;
      }
    });
  }
}
