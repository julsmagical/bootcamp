import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = `${environment.apiUrl}/users`;
  private http = inject(HttpClient);

  getUser(): Observable<IUser[]>{
    return this.http.get<IUser[]>(`${this.apiUrl}`);
  }

  getUserById(id: string): Observable<IUser>{
    return this.http.get<IUser>(`${this.apiUrl}/${id}`);
  }

  createUser(user: Partial<IUser>): Observable<IUser>{
    return this.http.post<IUser>(`${this.apiUrl}`, user);
  }

  updateUser(user: Partial<IUser>): Observable<IUser>{
    return this.http.put<IUser>(`${this.apiUrl}`, user);
  }

  deleteUser(id: string): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
