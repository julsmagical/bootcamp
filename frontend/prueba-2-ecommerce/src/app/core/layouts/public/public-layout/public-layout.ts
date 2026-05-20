import { Component } from '@angular/core';
import { PublicHeaderComponent } from "../components/public-header-component/public-header-component";
import { PublicFooterComponent } from "../components/public-footer-component/public-footer-component";
import { PublicNavbarComponent } from "../components/public-navbar-component/public-navbar-component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-public-layout',
  imports: [PublicHeaderComponent, PublicFooterComponent, RouterOutlet, PublicNavbarComponent],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.scss',
})
export class PublicLayout {}
