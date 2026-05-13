import { inject, Component, ChangeDetectionStrategy, signal, Signal } from '@angular/core';
//angular material
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
//interface y services
import { ServiceStudentComponent } from '../../services/service-student-component';
import { IStudent } from '../../interfaces/students';
import { Router } from "@angular/router";
import { StudentForm } from '../student-form/student-form';

@Component({
  selector: 'app-student-list-component',
  templateUrl: './student-list-component.html',
  styleUrl: './student-list-component.scss',
  imports: [MatCardModule, MatButtonModule, MatListModule, MatProgressSpinnerModule, MatDialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentListComponent {
  private _studentService = inject(ServiceStudentComponent);
  buscarId: string = '';
  //uso de signal
  students = signal<IStudent[]>([]);
  loading = signal(false); 
  error = signal<string | null>(null);
  
  constructor(private router: Router, private dialog: MatDialog){}

  ngOnInit(){
    this.cargarEstudiantes();
  }
  
  cargarEstudiantes() {
    this.loading.set(true);
    this.error.set(null);

    this._studentService.getAll().subscribe({
      next: (data) => {
        this.students.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar los estudiantes');
        this.loading.set(false);
      }
    });
  }

  verDetalle(id: string){
    this.router.navigate(['students/', id]);
  }

  agregarEstudiante(){
    const payload: Partial<IStudent> = {
    };
  }

  editarEstudiante(id: string){
    const payload: Partial<IStudent> = {
    }
  }

  abrirFormulario(student: IStudent | null=(null)){
    const dialogRef = this.dialog.open(StudentForm, {
      width: '480px',
      data: student
    });

    dialogRef.afterClosed().subscribe(cambios => {
      if(cambios) this.cargarEstudiantes();
    });
  }

  /* No implementado
  abrirConfirmacion(student: IStudent){
    const dialogRef = this.dialog.open(StudentConfirmDialog, {
      width: '480px',
      data: student
    });
  }*/
}
