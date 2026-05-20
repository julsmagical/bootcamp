import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Component } from '@angular/core';

@Component({
  selector: 'app-public-navbar-component',
  imports: [RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule,],
  templateUrl: './public-navbar-component.html',
  styleUrl: './public-navbar-component.scss',
})
export class PublicNavbarComponent {}
