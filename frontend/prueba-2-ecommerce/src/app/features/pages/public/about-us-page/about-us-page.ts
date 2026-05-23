import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about-us-page',
  imports: [MatCardModule, MatIconModule],
  templateUrl: './about-us-page.html',
  styleUrl: './about-us-page.scss',
})
export class AboutUsPage {}
