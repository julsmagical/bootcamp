import { Component, inject, signal } from '@angular/core';
import { ChefService } from '../../../services/chef-service';
import { IChef } from '../../../interfaces/chefs';

//angular material
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-chef-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatDialogContent, MatDialogActions],
  templateUrl: './chef-form.html',
  styleUrl: './chef-form.scss',
})
export class ChefForm {
  private chefService = inject(ChefService);
  private snackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder);
  dialogRef = inject(MatDialogRef<ChefForm>);

  chef: IChef | null = inject(MAT_DIALOG_DATA);

  loading = signal(false);
  isEdit = signal<boolean>(false);
  error = signal<string | null>(null);

  //Validaciones
  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    country: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]],
    city: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]],
    gender: ['', [Validators.required]]
  });

  ngOnInit() {
    if (this.chef) {
      this.isEdit.set(true);
      this.form.patchValue({
        name: this.chef.name,
        country: this.chef.country,
        city: this.chef.city,
        gender: this.chef.gender
      });
    }
  }

  guardar() {
    if (this.form.invalid) return;

    this.loading.set(true);

    const payload: Partial<IChef> = this.form.getRawValue();

    const request = this.isEdit()
      ? this.chefService.updateChef(this.chef!.id, payload)
      : this.chefService.createChef(payload);

    request.subscribe({
      next: () => {
        this.loading.set(false);

        this.snackBar.open(
          this.isEdit()
            ? 'Chef actualizado correctamente'
            : 'Chef registrado correctamente',
          'Cerrar',
          { duration: 2000 }
        );

        this.dialogRef.close(true);
      },

      error: () => {
        this.loading.set(false);
        this.snackBar.open(
          'Error al guardar al chef',
          'Cerrar',
          { duration: 2000 }
        );
      }
    });
  }

  //Nota: esta función la busque para no manejar todo en el html porque era mucho texto
  errorMessage(controlMessage: string): string {
    const control = this.form.get(controlMessage);

    if (!control || !control.errors || !control.touched) {
      return '';
    }
    if (control.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if (control.hasError('minlength')) {
      return `El mínimo es de ${control.errors['minlength'].requiredLength} caracteres`;
    }
    if (control.hasError('maxlength')) {
      return `El máximo es de ${control.errors['maxlength'].requiredLength} caracteres`;
    }
    if (control.hasError('pattern')) {
      return 'Solo se permiten letras y espacios';
    }
    return '';
  }
}
