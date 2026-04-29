import { Component } from '@angular/core';

@Component({
  selector: 'app-header-component',
  imports: [],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss',
})
export class HeaderComponent {
  appNombre: string = "Portal estudiantil";
  estudianteNombre: string = "Juliet";
  conectado: boolean = true;

  conectar(): void {
    this.conectado = !this.conectado;
  }
}

