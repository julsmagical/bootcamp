import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { RecipeService } from '../../../services/recipe-service';
import { IRecipe } from '../../../interfaces/recipes';

//angular material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions
],
  templateUrl: './recipe-form.html',
  styleUrl: './recipe-form.scss',
})
export class RecipeForm {

  private recipeService = inject(RecipeService);
  private snackBar = inject(MatSnackBar);
  dialogRef = inject(MatDialogRef<RecipeForm>);

  recipe: IRecipe | null = inject(MAT_DIALOG_DATA);

  loading = signal(false);
  isEdit = signal<boolean>(false);
  error = signal<string | null>(null);

  //validaciones basicas
  form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)]
    }),

    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(5)]
    }),

    country: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)]
    }),
  });

  ngOnInit() {
    if (this.recipe) {
      this.isEdit.set(true);
      this.form.patchValue({
        name: this.recipe.name,
        description: this.recipe.description,
        country: this.recipe.country
      });
    }
  }

  guardar() {
    if (this.form.invalid) return;

    this.loading.set(true);

    const payload: Partial<IRecipe> = this.form.getRawValue();

    const request = this.isEdit()
      ? this.recipeService.updateRecipe(this.recipe!.id, payload)
      : this.recipeService.createRecipe(payload);

    request.subscribe({
      next: () => {
        this.loading.set(false);

        this.snackBar.open(
          this.isEdit()
            ? 'Receta actualizada correctamente'
            : 'Receta creada correctamente',
          'Cerrar',
          { duration: 2000 }
        );

        this.dialogRef.close(true);
      },

      error: () => {
        this.loading.set(false);

        this.snackBar.open(
          'Error al guardar la receta',
          'Cerrar',
          { duration: 2000 }
        );
      }
    });
  }
}
