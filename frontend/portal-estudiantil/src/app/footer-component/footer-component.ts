import { Component } from '@angular/core';

@Component({
  selector: 'app-footer-component',
  imports: [],
  templateUrl: './footer-component.html',
  styleUrl: './footer-component.scss',
})
export class FooterComponent {
  anio = new Date().getFullYear();
  mensaje = '';

  generarMensaje(){
    this.mensaje = '©2026. Todos los derechos reservados a Portal Estudiantil'
  }
}
