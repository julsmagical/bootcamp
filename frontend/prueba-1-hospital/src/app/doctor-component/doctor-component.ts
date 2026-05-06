import { Component, inject } from '@angular/core';
import { Doctors } from '../services/doctors';
import { IDoctor } from '../interfaces/doctor';

@Component({
  selector: 'app-doctor-component',
  imports: [],
  templateUrl: './doctor-component.html',
  styleUrl: './doctor-component.scss',
})
export class DoctorComponent {

  private _doctorService = inject(Doctors);
  doctors: IDoctor[] = [];
  buscarId: string = '';
  loading = false; 
  error = '';
    
  ngOnInit(){
    this.cargarDoctores();
  }
  
  cargarDoctores() {
    this.loading = true;
    this.error = '';

    this._doctorService.getAll().subscribe({
      next: (data) => {
        this.doctors = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los pacientes';
        this.loading = false;
      }
    });
  }

  agregarDoctor(){
    const payload: Partial<IDoctor> = {
      name: 'JM-doctor-5',
      lastName: 'Juliet Morales',
      gender: 'Female',
      address: 'Guayaquil',
    };

    this._doctorService.createDoctor(payload).subscribe({
      next: (nuevo) => {
        this.doctors = [...this.doctors, nuevo];
      },
      error: () => {
        this.error = 'Error al crear a el doctor';
      }
    });
  }

  editarDoctor(id: string){
    const payload: Partial<IDoctor> = {
      name: 'JM-doctor-3-editado',
      lastName: 'Juliet Morales',
      gender: 'Female',
      address: 'Guayaquil',
    };

    this._doctorService.updateDoctor(id, payload).subscribe({
      next: (actualizado) => {
        this.doctors = this.doctors.map(e =>
          e.id === id ? actualizado : e
        );
      },
      error: () => {
        this.error = 'Error al editar a el doctor';
      }
    });
  }

  eliminarDoctor(id: string){
    this._doctorService.deleteDoctor(id).subscribe({
      next: () => {
        this.doctors = this.doctors.filter(e => e.id !== id);
      },
      error: () => {
        this.error = 'Error al eliminar a el doctor';
      }
    });
  }
}
