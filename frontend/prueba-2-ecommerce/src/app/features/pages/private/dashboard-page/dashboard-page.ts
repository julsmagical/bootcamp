import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/private/auth-service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard-page',
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {
  private auth = inject(AuthService);
  currentUser = this.auth.username;
}
