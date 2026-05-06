import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPatient } from '../interfaces/patient';

@Injectable({
  providedIn: 'root',
})

export class Patients {
  private apiUrl = environment.apiUrl;
  private _http = inject(HttpClient);

  getAll(): Observable<IPatient[]> {
    return this._http.get<IPatient[]>(`${this.apiUrl}/patients`);
  }

  getById(id:string): Observable<IPatient>{
    return this._http.get<IPatient>(`${this.apiUrl}/patients/${id}`);
  }

  createPatient(patient: Partial<IPatient>): Observable<IPatient>{
    return this._http.post<IPatient>(`${this.apiUrl}/patients`, patient);
  }

  updatePatient(id: string, patient: Partial<IPatient>): Observable<IPatient>{
    return this._http.put<IPatient>(`${this.apiUrl}/patients/${id}`, patient);
  }

  deletePatient(id: string): Observable<void>{
    return this._http.delete<void>(`${this.apiUrl}/patients/${id}`);
  }
}
