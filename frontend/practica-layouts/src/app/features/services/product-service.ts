import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly apiUrl = `${environment.apiUrl}/products`;
  private http = inject(HttpClient);

  //CRUD
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.apiUrl}`);
  }

  getProductById(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: Partial<IProduct>): Observable<IProduct>{
    return this.http.post<IProduct>(`${this.apiUrl}`, product);
  }

  updateProduct(product: Partial<IProduct>): Observable<IProduct>{
    return this.http.put<IProduct>(`${this.apiUrl}`, product);
  }

  deleteProduct(id: string): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
