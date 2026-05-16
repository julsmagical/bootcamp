import { Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { RecipeService } from '../../../services/recipe-service';
import { IRecipe } from '../../../interfaces/recipes';

@Component({
  selector: 'app-recipe-dialog',
  imports: [],
  templateUrl: './recipe-dialog.html',
  styleUrl: './recipe-dialog.scss',
})
export class RecipeDialog {
  private _recipeService = inject(RecipeService);
  private snackBar = inject(MatSnackBar);
  private dialogRef = inject(MatDialogRef<RecipeDialog>);

  recipe: IRecipe | null = inject(MAT_DIALOG_DATA);

  loading = signal(false);

  eliminar() {

    if (!this.recipe) return;

    this.loading.set(true);

    this._recipeService.deleteRecipe(this.recipe.id).subscribe({
      next: () => {
        this.loading.set(false);

        this.snackBar.open(
          `Receta "${this.recipe?.name}" eliminada correctamente`,
          'Cerrar',
          { duration: 2000 }
        );

        this.dialogRef.close(true);
      },

      error: () => {
        this.loading.set(false);

        this.snackBar.open(
          'Error al eliminar la receta',
          'Cerrar',
          { duration: 2000 }
        );
      }
    });
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}
