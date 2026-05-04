import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { IEmployee } from '../interfaces/employees';

@Injectable({
  providedIn: 'root',
})
export class EmployeesServices {
  private apiUrl = environment.apiUrl;
  private _http = inject(HttpClient);

  getAll(): Observable<IEmployee[]> {
    return this._http.get<IEmployee[]>(`${this.apiUrl}/employees`);
  }

  getById(id:string): Observable<IEmployee>{
    return this._http.get<IEmployee>(`${this.apiUrl}/employees/${id}`);
  }
}

