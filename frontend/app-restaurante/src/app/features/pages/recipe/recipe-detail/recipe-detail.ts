import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

import { RecipeService } from '../../../services/recipe-service';
import { IRecipe } from '../../../interfaces/recipes';
import { RecipeForm } from '../recipe-form/recipe-form';
import { GenericDialog } from '../../../../shared/components/generic-dialog/generic-dialog';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatProgressSpinnerModule, MatDialogModule, MatSnackBarModule],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.scss',
})
export class RecipeDetail implements OnInit {
  private _recipeService = inject(RecipeService);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

  recipe = signal<IRecipe | null>(null);
  loading = signal(false);
  error = signal<string>('');

  ngOnInit() {
    const id = this._route.snapshot.paramMap.get('id');
    if (id) {
      this.cargarDetalle(id);
    } else {
      this.error.set('No se encontró el ID de la receta');
    }
  }

  cargarDetalle(id: string) {
    this.loading.set(true);
    this._recipeService.getRecipeById(id).subscribe({
      next: (data) => {
        this.recipe.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Error al cargar la receta');
        this.loading.set(false);
      },
    });
  }

  volverALista() {
    this._router.navigate(['/recipes']);
  }

  editarReceta(recipe: IRecipe) {
    const dialogRef = this._dialog.open(RecipeForm, {
      width: '480px',
      data: recipe
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cargarDetalle(recipe.id);
      }
    });
  }

  eliminarReceta(recipe: IRecipe) {
    const saveSubject = new Subject<void>();

    saveSubject.subscribe(() => {
      this.loading.set(true);
      this._recipeService.deleteRecipe(recipe.id).subscribe({
        next: () => {
          this.loading.set(false);
          this._snackBar.open(
            `Receta "${recipe.name}" eliminada correctamente`,
            'Cerrar',
            { duration: 2000 }
          );
          dialogRef.close(true);
        },
        error: () => {
          this.loading.set(false);
          this._snackBar.open(
            'Error al eliminar la receta',
            'Cerrar',
            { duration: 2000 }
          );
        }
      });
    });

    const dialogRef = this._dialog.open(GenericDialog, {
      width: '420px',
      data: {
        title: 'Eliminar receta',
        message: `¿Estás seguro de que deseas eliminar la receta:`,
        subMessage: `"${recipe.name}"? Esta acción no se puede deshacer.`,
        btnText: 'Eliminar',
        btnColor: 'warn',
        onSave: saveSubject,
        action: 'delete',
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      saveSubject.complete();
      if (result === true) {
        this.volverALista();
      }
    });
  }
}