import { Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { RecipeService } from '../../../services/recipe-service';
import { IRecipe } from '../../../interfaces/recipes';
import { GenericDialog } from '../../../../shared/components/generic-dialog/generic-dialog';

@Component({
  selector: 'app-recipe-dialog',
  imports: [],
  templateUrl: './recipe-dialog.html',
  styleUrl: './recipe-dialog.scss',
})
export class RecipeDialog {
  private _recipeService = inject(RecipeService);
  private snackBar = inject(MatSnackBar);
  //private dialogRef = inject(MatDialogRef<RecipeDialog>);
  private dialogData = inject(MAT_DIALOG_DATA);

  recipe: IRecipe | null = null;
  loading = signal(false);

  ngOnInit() {
    if (this.dialogData) {
      this.recipe = this.dialogData.recipe; //receta de la lista
      this.dialogData.onSave?.subscribe(() => this.eliminar()); //para el generic dialog
    }
  }

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

        this.dialogData.dialogRef?.close(true); //cerrar el dialog y actualizar 
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
    this.dialogData.dialogRef.close(false);
  }
}