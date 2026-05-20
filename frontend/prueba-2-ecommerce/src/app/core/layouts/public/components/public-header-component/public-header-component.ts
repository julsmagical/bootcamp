import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-public-header-component',
  standalone: true,
  imports: [MatButtonModule, MatToolbarModule, RouterLink],
  templateUrl: './public-header-component.html',
  styleUrl: './public-header-component.scss',
})
export class PublicHeaderComponent {
  appName: string = "Nova Market";
}
