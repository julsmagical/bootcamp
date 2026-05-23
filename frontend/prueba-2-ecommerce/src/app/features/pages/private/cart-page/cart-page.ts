import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../../services/private/carts-service';
import { ICart } from '../../../interfaces/private/carts-interface';

@Component({
  selector: 'app-cart-page',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.scss'
})
export class CartPage implements OnInit {
  private cartService = inject(CartService);
  private router = inject(Router);
  carts = signal<ICart[]>([]);
  displayedColumns = ['id', 'products', 'quantity', 'total', 'actions'];

  ngOnInit(): void {
    this.loadCarts();
  }

  loadCarts(): void {
    this.cartService.getCarts().subscribe({
      next: (data) => {
        console.log(data);
        this.carts.set(data.carts);
      }
    });
  }

  viewCart(id: number): void {
    this.router.navigate(['/private/carts', id]);
  }

  deleteCart(id: number): void {
    this.cartService.deleteCart(id.toString()).subscribe({
      next: () => {
        this.loadCarts();
      }
    });
  }
}