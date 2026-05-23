import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { ICart, ICartsResponse } from '../../interfaces/private/carts-interface';


@Injectable({
  providedIn: 'root',
})
export class CartService {

  private readonly apiUrl = `${environment.apiUrl}/carts`;
  private http = inject(HttpClient);

  getCarts(): Observable<ICartsResponse> {
    return this.http.get<ICartsResponse>(`${this.apiUrl}`);
  }

  getCartById(id: string): Observable<ICart> {
    return this.http.get<ICart>(`${this.apiUrl}/${id}`);
  }

  createCart(cart: any): Observable<ICart> {
    return this.http.post<ICart>(`${this.apiUrl}/add`, cart);
  }

  updateCart(id: string, products: any[]): Observable<ICart> {
    return this.http.put<ICart>(`${this.apiUrl}/${id}`,{
        merge: true,
        products
      }
    );
  }

  deleteCart(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}