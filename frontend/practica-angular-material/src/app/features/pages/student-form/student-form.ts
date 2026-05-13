import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
//angular material
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ServiceStudentComponent } from '../../services/service-student-component';
import { IStudent } from '../../interfaces/students';
import { ActivatedRoute, IsActiveMatchOptions, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogContent, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-student-form',
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatDialogClose, MatDialogContent],
  templateUrl: './student-form.html',
  styleUrl: './student-form.scss',
})

export class StudentForm {
  private fb = inject(FormBuilder);
  private _studentService = inject(ServiceStudentComponent);
  private dialogRef = inject(MatDialogRef<StudentForm>);

  isEdit = signal<boolean| null>(null);
  loading = signal(false);
  student: IStudent | null = inject(MAT_DIALOG_DATA);
  error = signal<string | null>(null);

  form = this.fb.group({ 
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    courseId: ['', Validators.required]
  });

  constructor(private route: ActivatedRoute, private router: Router){}

  ngOnInit(){
    if (this.student){
      this.isEdit.set(true);
      this.form.patchValue(this.student)
    }
  }

  guardar(){
    if(this.form.invalid) return;
    this.loading.set(true);

    const payload = this.form.value as Partial<IStudent>;

    const accion = this.isEdit()
      ? this._studentService.updateStudent(this.student!.id, payload)
      : this._studentService.createStudent(payload);

    accion.subscribe({
      next: () => this.router.navigate(['/students']),
      error: () => this.loading.set(false)
    });
  }
}
