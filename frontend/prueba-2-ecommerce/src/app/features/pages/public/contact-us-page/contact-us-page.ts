import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-contact-us-page',
  imports: [MatCardModule, MatIconModule],
  templateUrl: './contact-us-page.html',
  styleUrl: './contact-us-page.scss',
})
export class ContactUsPage {}
