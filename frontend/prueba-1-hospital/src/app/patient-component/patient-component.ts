import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Patients } from '../services/patients';
import { IPatient } from '../interfaces/patient';

@Component({
  selector: 'app-patient-component',
  imports: [FormsModule],
  templateUrl: './patient-component.html',
  styleUrl: './patient-component.scss',
})
export class PatientComponent {
  private _patientService = inject(Patients);
  patients: IPatient[] = [];
  buscarId: string = '';
  loading = false; 
  error = '';
  
  ngOnInit(){
    this.cargarPacientes();
  }
  
  cargarPacientes() {
    this.loading = true;
    this.error = '';

    this._patientService.getAll().subscribe({
      next: (data) => {
        this.patients = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los pacientes';
        this.loading = false;
      }
    });
  }

  agregarPaciente(){
    const payload: Partial<IPatient> = {
      name: 'JM-paciente-5',
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwfGB6dUnr2_mIK2bbLG3JM0IWyfATg0efwQ&s',
      age: 20,
      phone: '0966324451',
    };

    this._patientService.createPatient(payload).subscribe({
      next: (nuevo) => {
        this.patients = [...this.patients, nuevo];
      },
      error: () => {
        this.error = 'Error al crear el paciente';
      }
    });
  }

  editarPaciente(id: string){
    const payload: Partial<IPatient> = {
      name: 'JM-paciente-4-editado',
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwfGB6dUnr2_mIK2bbLG3JM0IWyfATg0efwQ&s',
      age: 20,
      phone: '0966324451',
    };

    this._patientService.updatePatient(id, payload).subscribe({
      next: (actualizado) => {
        this.patients = this.patients.map(e =>
          e.id === id ? actualizado : e
        );
      },
      error: () => {
        this.error = 'Error al editar el paciente';
      }
    });
  }

  eliminarPaciente(id: string){
    this._patientService.deletePatient(id).subscribe({
      next: () => {
        this.patients = this.patients.filter(e => e.id !== id);
      },
      error: () => {
        this.error = 'Error al eliminar el paciente';
      }
    });
  }
}
