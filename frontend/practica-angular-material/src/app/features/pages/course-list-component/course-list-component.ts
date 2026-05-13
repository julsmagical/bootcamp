import { Component, inject } from '@angular/core';
import { ServiceCourseComponent } from '../../services/service-course-component';
import { ICourse } from '../../interfaces/courses';
//angular material
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Router } from "@angular/router";

@Component({
  selector: 'app-course-list-component',
  imports: [MatCardModule, MatButtonModule, MatListModule, MatProgressSpinnerModule],
  templateUrl: './course-list-component.html',
  styleUrl: './course-list-component.scss',
})
export class CourseListComponent {
  private _courseService = inject(ServiceCourseComponent);
  courses: ICourse[] = [];
  buscarId: string = '';
  loading = false; 
  error = '';

  constructor(private router: Router){}
  
  ngOnInit(){
    this.cargarCursos();
  }
  
  cargarCursos() {
    this.loading = true;
    this.error = '';

    this._courseService.getAll().subscribe({
      next: (data) => {
        this.courses = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los cursos';
        this.loading = false;
      }
    });
  }

  verDetalle(id: string){
    this.router.navigate(['courses/', id]);
  }
}
