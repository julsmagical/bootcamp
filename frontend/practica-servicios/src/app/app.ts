import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DepartmentsComponent } from './departments-component/departments-component';
import { EmployeesComponent } from './employees-component/employees-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DepartmentsComponent, EmployeesComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('practica-servicios');
}
