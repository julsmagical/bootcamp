import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IChef } from '../interfaces/chefs';

@Injectable({
  providedIn: 'root',
})
export class ChefService {
  // URL base de la API
  private apiUrl = environment.apiUrl;
  private _http = inject(HttpClient);

  // Get-All
  getChefs(): Observable<IChef[]> {
    return this._http.get<IChef[]>(`${this.apiUrl}/chefs`)
  }

  // Get-By-Id
  getChefById(id: string): Observable<IChef> {
    return this._http.get<IChef>(`${this.apiUrl}/chefs/${id}`);
  }

  // Create
  createChef(chef: Partial<IChef>): Observable<IChef> {
    return this._http.post<IChef>(`${this.apiUrl}/chefs`, chef);
  }

  // Update
  updateChef(id: string, chef: Partial<IChef>): Observable<IChef> {
    return this._http.put<IChef>(`${this.apiUrl}/chefs/${id}`, chef);
  }

  // Delete
  deleteChef(id: string): Observable<void> {
    return this._http.delete<void>(`${this.apiUrl}/chefs/${id}`);
  }
}
