import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IProduct } from '../../../../interfaces/public/public-interface';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductService } from '../../../../services/private/product-service';
import { MatSelectModule } from '@angular/material/select';
import { ProductDialog } from '../product-dialog/product-dialog';

@Component({
  selector: 'app-product-page',
  imports: [CommonModule, ReactiveFormsModule, MatTableModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDialogModule, MatSnackBarModule],
  templateUrl: './product-page.html',
  styleUrl: './product-page.scss',
})
export class ProductPage implements OnInit{
  private productService = inject(ProductService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  products = signal<IProduct[]>([]);
  filteredProducts = signal<IProduct[]>([]);
  
  searchControl = new FormControl('');
  categoryControl = new FormControl('Todos');
  
  categories = signal<string[]>(['Todos', 'Tecnología', 'Accesorios', 'Audio', 'Almacenamiento']);
  displayedColumns: string[] = ['image', 'name', 'category', 'price', 'stock', 'actions'];

  ngOnInit(): void {
    this.loadProducts();
    
    this.searchControl.valueChanges.subscribe(() => this.applyFilter());
    this.categoryControl.valueChanges.subscribe(() => this.applyFilter());
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data: any) => {
        console.log('Datos exitosos:', data);
        this.products.set(data.products);
        this.filteredProducts.set(data.products);
      },
      error: (err) => {
        this.showSnackBar('Error al cargar productos');
      }
    });
  }

  applyFilter(): void {
    const search = (this.searchControl.value || '').toLowerCase().trim();
    
    const result = this.products().filter(product => 
      product.title.toLowerCase().includes(search) || // Cambiado a title
      product.description.toLowerCase().includes(search)
    );

    this.filteredProducts.set(result);
  }

  openDialog(product?: IProduct): void {
    const dialogRef = this.dialog.open(ProductDialog, {
      width: '450px',
      data: product || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProducts();
        this.showSnackBar(product ? 'Producto modificado' : 'Producto creado');
      }
    });
  }

  deleteProduct(id: string): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.loadProducts();
          this.showSnackBar('Producto eliminado');
        },
        error: () => this.showSnackBar('Error al eliminar el producto')
      });
    }
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', { duration: 3000 });
  }
}
