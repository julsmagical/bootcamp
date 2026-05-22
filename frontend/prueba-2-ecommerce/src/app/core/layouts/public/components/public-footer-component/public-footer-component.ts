import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-public-footer-component',
  standalone: true,
  imports: [CommonModule, RouterModule, MatDividerModule, MatButtonModule, MatIconModule],
  templateUrl: './public-footer-component.html',
  styleUrl: './public-footer-component.scss',
})
export class PublicFooterComponent {
  currentYear: number = new Date().getFullYear();
}
