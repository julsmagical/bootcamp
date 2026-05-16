import { Component, inject, signal } from '@angular/core';
import { RecipeService } from '../../../services/recipe-service';
import { IRecipe } from '../../../interfaces/recipes';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  imports: [],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.scss',
})
export class RecipeDetail {
  private _recipeService = inject(RecipeService);
  private route = inject(ActivatedRoute);
  
  //Uso de signal
  recipeSelected = signal<IRecipe | null>(null);
  error = signal<string>('');

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.cargarDetalle(id);
    } else {
      this.error.set('No se encontró el ID de la receta');
    }
  }

  cargarDetalle(id: string){
    this._recipeService.getRecipeById(id).subscribe({
      next: (data) => {
        this.recipeSelected.set(data); 
      },
      error: () => {
        this.error.set(`Error al cargar la receta con el id: ${id}`);
      }
    });
  }
}