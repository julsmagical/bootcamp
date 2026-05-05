import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDepartments } from '../interfaces/departments';

@Injectable({
  providedIn: 'root',
})
export class DepartmentsServices {
  private apiUrl = environment.apiUrl;
  private _http = inject(HttpClient);

  //get-all
  getAll(): Observable<IDepartments[]> {
    return this._http.get<IDepartments[]>(`${this.apiUrl}/departments`);
  }

  //get-by-id
  getById(id:string): Observable<IDepartments>{
    return this._http.get<IDepartments>(`${this.apiUrl}/departments/${id}`);
  }

  // resto del CRUD
  createDepartment(department: Partial<IDepartments>): Observable<IDepartments>{
    return this._http.post<IDepartments>(`${this.apiUrl}/departments`, department);
  }

  updateDepartment(id: string, department: Partial<IDepartments>): Observable<IDepartments>{
    return this._http.put<IDepartments>(`${this.apiUrl}/departments/${id}`, department);
  }

  deleteDepartment(id: string): Observable<void>{
    return this._http.delete<void>(`${this.apiUrl}/departments/${id}`);
  }
}
