import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PatientComponent } from './patient-component/patient-component';
import { DoctorComponent } from './doctor-component/doctor-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PatientComponent, DoctorComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('prueba-1-hospital');
}
