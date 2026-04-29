import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { reduce } from 'rxjs';

interface Materia {
 nombre: string;
 creditos: number;
 aprobada: boolean;
}

@Component({
  selector: 'app-body-component',
  imports: [FormsModule],
  templateUrl: './body-component.html',
  styleUrl: './body-component.scss',
})
export class BodyComponent {
  busqueda: string = '';
  creditos: number = 45;
  materias: Materia[] = [
  { nombre: 'Cálculo', creditos: 4, aprobada: true },
  { nombre: 'Física', creditos: 4, aprobada: false },
  { nombre: 'Programación', creditos: 3, aprobada: true },
  { nombre: 'Base de Datos', creditos: 3, aprobada: false },
  { nombre: 'Inglés', creditos: 2, aprobada: true },
];

  //porcentajes
  get porcentaje(): number{
    return (this.creditos/120)*100;
  }

  get colorBarra(): string {
    if(this.creditos<40) return 'red';
    if(this.creditos<70) return 'orange';
    return 'green';
  } 

  sumaCreditos(): void{
    if (this.creditos <=120){
      this.creditos += 10;
    }
    //mini-validacion para que no exceda
    if(this.creditos >120){
      this.creditos = 120;
    }
  }

  restaCreditos(): void{
    if (this.creditos >= 0){
      this.creditos -= 10;
    }
    //mini-validacion para que sea mayor a 0
    if(this.creditos <0){
      this.creditos = 0;
    }
  }
}
