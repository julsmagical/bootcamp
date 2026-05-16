import { Component, inject, signal } from '@angular/core';
import { IRecipe } from '../../../interfaces/recipes';
import { RecipeService } from '../../../services/recipe-service';
import { Router } from '@angular/router';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RecipeForm } from '../recipe-form/recipe-form';
import { RecipeDialog } from '../recipe-dialog/recipe-dialog';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-recipe-list',
  imports: [MatCardModule, MatProgressSpinnerModule],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.scss',
})
export class RecipeList {
  private _recipeService = inject(RecipeService);
  // Uso de signal
  recipes = signal<IRecipe[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit() {
    this.cargarRecetas();
  }

  cargarRecetas() {
    this.loading.set(true);
    this.error.set(null);

    this._recipeService.getRecipes().subscribe({
      next: (data) => {
        this.recipes.set(data);
        this.loading.set(false);
        console.log(this.recipes()[0]);
      },
      error: (err) => {
        this.error.set('Error al cargar las recetas');
        this.loading.set(false);
      },
    });
  }

  verDetalle(id: string) {
    this.router.navigate(['/recipes', id]);
  }

  abrirFormulario(recipe: IRecipe | null = null){
    const dialogRef = this.dialog.open(RecipeForm, {
      width: '480px',
      data: recipe
    })
  }

  abrirDialog(recipe: IRecipe) {
    const dialogRef = this.dialog.open(RecipeDialog, {
      data: recipe
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cargarRecetas();
      }
    });
  }
}
