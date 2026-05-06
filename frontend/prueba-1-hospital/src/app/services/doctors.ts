import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDoctor } from '../interfaces/doctor';

@Injectable({
  providedIn: 'root',
})
export class Doctors {
  private apiUrl = environment.apiUrl;
  private _http = inject(HttpClient);

  getAll(): Observable<IDoctor[]> {
    return this._http.get<IDoctor[]>(`${this.apiUrl}/doctors`);
  }

  getById(id:string): Observable<IDoctor>{
    return this._http.get<IDoctor>(`${this.apiUrl}/doctors/${id}`);
  }

  createDoctor(doctor: Partial<IDoctor>): Observable<IDoctor>{
    return this._http.post<IDoctor>(`${this.apiUrl}/doctors`, doctor);
  }

  updateDoctor(id: string, doctor: Partial<IDoctor>): Observable<IDoctor>{
    return this._http.put<IDoctor>(`${this.apiUrl}/doctors/${id}`, doctor);
  }

  deleteDoctor(id: string): Observable<void>{
    return this._http.delete<void>(`${this.apiUrl}/doctors/${id}`);
  }
}
