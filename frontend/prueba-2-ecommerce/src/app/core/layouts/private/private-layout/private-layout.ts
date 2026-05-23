import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../../features/services/private/auth-service';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';

interface NavItem {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-private-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule, MatIconModule, MatListModule, MatTooltipModule],
  templateUrl: './private-layout.html',
  styleUrl: './private-layout.scss',
})
export class PrivateLayout {
  private auth = inject(AuthService);

  collapsed = signal(false);
  username = this.auth.username;

  navItems: NavItem[] = [
    { icon: 'dashboard', label: 'Dashboard', route: '/admin/dashboard' },
    { icon: 'inventory_2', label: 'Productos', route: '/admin/adminproducts' },
    { icon: 'cart-shopping', label: 'Carrito', route: '/admin/carts'}
  ];

  toggle() {
    this.collapsed.set(!this.collapsed());
  }

  logout() {
    this.auth.logout();
  }
}