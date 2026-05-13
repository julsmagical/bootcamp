import { Component } from '@angular/core';
import {MatTabsModule} from "@angular/material/tabs";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-navbar-component',
  imports: [MatTabsModule, RouterLink],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.scss',
})
export class NavbarComponent {}
