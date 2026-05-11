import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IStudent } from '../interfaces/students';

@Injectable({
  providedIn: 'root',
})
export class ServiceStudentComponent {
  private apiUrl = environment.apiUrl;
  private _http = inject(HttpClient);

  //get-all
  getAll(): Observable<IStudent[]> {
    return this._http.get<IStudent[]>(`${this.apiUrl}/students`);
  }

  //get-by-id
  getById(id:string): Observable<IStudent>{
    return this._http.get<IStudent>(`${this.apiUrl}/students/${id}`);
  }

  //RESTO DEL CRUD (no implementado)
  /*
  createStudent(student: Partial<IStudent>): Observable<IStudent>{
    return this._http.post<IStudent>(`${this.apiUrl}/students`, student);
  }

  updateStudent(id: string, student: Partial<IStudent>): Observable<IStudent>{
    return this._http.put<IStudent>(`${this.apiUrl}/students/${id}`, student);
  }

  deleteStudent(id: string): Observable<void>{
    return this._http.delete<void>(`${this.apiUrl}/students/${id}`);
  }*/
}
