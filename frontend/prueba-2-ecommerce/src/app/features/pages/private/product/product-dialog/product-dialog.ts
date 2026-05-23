import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IProduct } from '../../../../interfaces/public/public-interface';

import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ProductService } from '../../../../services/private/product-service';

@Component({
  selector: 'app-product-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './product-dialog.html',
  styleUrl: './product-dialog.scss'
})
export class ProductDialog implements OnInit {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private dialogRef = inject(MatDialogRef<ProductDialog>);
  data = inject<IProduct | null>(MAT_DIALOG_DATA);

  isEditMode = false;
  categories: string[] = ['Tecnología', 'Accesorios', 'Audio', 'Almacenamiento'];

  form = this.fb.group({
    id: [null as number | null],
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0.01)]],
    category: ['', Validators.required],
    image: [''],
    stock: [0, [Validators.required, Validators.min(0)]]
  });

  ngOnInit(): void {
    if (this.data) {
      this.isEditMode = true;
      this.form.patchValue(this.data);
    }
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }

    const productData = this.form.value as Partial<IProduct>;

    if (this.isEditMode) {
      this.productService.updateProduct(productData).subscribe({
        next: () => this.dialogRef.close(true)
      });
    } else {
      this.productService.createProduct(productData).subscribe({
        next: () => this.dialogRef.close(true)
      });
    }
  }
}