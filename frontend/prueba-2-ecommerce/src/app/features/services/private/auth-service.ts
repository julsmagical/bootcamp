import { computed, Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { JwtPayload, LoginRequest, LoginResponse } from '../../interfaces/private/login-interface';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API = environment.apiUrl;
  private readonly TOKEN_KEY = environment.tokenKey;
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private _token = signal<string | null>(localStorage.getItem(this.TOKEN_KEY));

  isAuthenticated = computed(() => !!this._token());
  token = computed(() => this._token());

  payload = computed<JwtPayload | null >(() => {
      const t = this._token();
      return t ? this.decodeToken(t) : null;
  });

  username = computed(() => this.payload()?.user ?? null);
  userId = computed(() => this.payload()?.sub ?? null);

  login(credentials: LoginRequest) {
      return this.http
          .post<LoginResponse>(`${this.API}/auth/login`, credentials)
          .pipe(
              tap((res) => {
                  localStorage.setItem(this.TOKEN_KEY, res.token);
                  this._token.set(res.token);
              })
          );
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this._token.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
      return this._token();
  }

  private decodeToken(token: string): JwtPayload | null {
      try {
          const payload = token.split('.')[1];
          const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
          return JSON.parse(decoded) as JwtPayload;
      } catch {
          return null;
      }
  }
}