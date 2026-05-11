import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICourse } from '../interfaces/courses';

@Injectable({
  providedIn: 'root',
})
export class ServiceCourseComponent {
  private apiUrl = environment.apiUrl;
  private _http = inject(HttpClient);

  //get-all
  getAll(): Observable<ICourse[]> {
    return this._http.get<ICourse[]>(`${this.apiUrl}/courses`);
  }

  //get-by-id
  getById(id:string): Observable<ICourse>{
    return this._http.get<ICourse>(`${this.apiUrl}/courses/${id}`);
  }

  //RESTO DEL CRUD (no implementado)
  /*createCourse(course: Partial<ICourse>): Observable<ICourse>{
    return this._http.post<ICourse>(`${this.apiUrl}/courses`, course);
  }

  updateCourse(id: string, course: Partial<ICourse>): Observable<ICourse>{
    return this._http.put<ICourse>(`${this.apiUrl}/courses/${id}`, course);
  }

  deleteCourse(id: string): Observable<void>{
    return this._http.delete<void>(`${this.apiUrl}/courses/${id}`);
  }*/
}
