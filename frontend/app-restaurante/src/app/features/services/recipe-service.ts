import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRecipe } from '../interfaces/recipes';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  // URL base de la API
  private apiUrl = environment.apiUrl;
  private _http = inject(HttpClient);


  // Get-All
  getRecipes(): Observable<IRecipe[]> {
    return this._http.get<IRecipe[]>(`${this.apiUrl}/recipes`)
  }

  // Get-By-Id
  getRecipeById(id: string): Observable<IRecipe>  {
    return this._http.get<IRecipe>(`${this.apiUrl}/recipes/${id}`);
  }

  // Create
  createRecipe(recipe: Partial<IRecipe>): Observable<IRecipe> {
    return this._http.post<IRecipe>(`${this.apiUrl}/recipes`, recipe);
  }

  // Update
  updateRecipe(id: string, recipe: Partial<IRecipe>): Observable<IRecipe> {
    return this._http.put<IRecipe>(`${this.apiUrl}/recipes/${id}`, recipe);
  }

  // Delete
  deleteRecipe(id: string): Observable<void> {
    return this._http.delete<void>(`${this.apiUrl}/recipes/${id}`);
  }
}
