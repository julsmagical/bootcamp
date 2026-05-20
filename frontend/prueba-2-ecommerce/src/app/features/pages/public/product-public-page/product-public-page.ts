import { Component, inject, signal } from '@angular/core';
import { IProduct } from '../../../interfaces/public/public-interface';
import { ProductService } from '../../../services/private/product-service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-public-page',
  imports: [],
  templateUrl: './product-public-page.html',
  styleUrl: './product-public-page.scss',
})
export class ProductPublicPage {
  private productService = inject(ProductService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  products = signal<IProduct[]>([]);
  loading = signal(true);

  displayedColumns = ['image', 'title', 'category', 'price'];

  ngOnInit() {
      this.loadProducts();
  }

  loadProducts() {
      this.loading.set(true);
      this.productService.getProducts().subscribe({
          next: (data: any) => {
            this.products.set(data.products); 
            this.loading.set(false); },
          error: () => this.loading.set(false),
      });
  }
}
