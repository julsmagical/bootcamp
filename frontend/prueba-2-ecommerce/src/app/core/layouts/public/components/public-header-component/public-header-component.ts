import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-public-header-component',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './public-header-component.html',
  styleUrl: './public-header-component.scss',
})
export class PublicHeaderComponent {
  appName: string = "Nova Market";
}
