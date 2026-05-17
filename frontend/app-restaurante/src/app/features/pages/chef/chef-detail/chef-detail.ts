import { Component, inject, signal } from '@angular/core';
import { ChefService } from '../../../services/chef-service';
import { ActivatedRoute, Router } from '@angular/router';
// nota: importante que el router sea ese

import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { IChef } from '../../../interfaces/chefs';
import { ChefForm } from '../chef-form/chef-form';
import { GenericDialog } from '../../../../shared/components/generic-dialog/generic-dialog';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-chef-detail',
  standalone: true,
  imports: [MatCardModule, MatProgressSpinnerModule, MatDialogModule, MatSnackBarModule, MatButtonModule],
  templateUrl: './chef-detail.html',
  styleUrl: './chef-detail.scss',
})
export class ChefDetail {
  private _chefService = inject(ChefService);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

  chef = signal<IChef | null>(null);
  loading = signal(false);
  error = signal<string>('');

  ngOnInit() {
    const id = this._route.snapshot.paramMap.get('id');
    if (id) {
      this.cargarDetalle(id);
    } else {
      this.error.set('No se encontró el ID del cocinero');
    }
  }

  cargarDetalle(id: string) {
    this.loading.set(true);
    this._chefService.getChefById(id).subscribe({
      next: (data) => {
        this.chef.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Error al cargar al cocinero');
        this.loading.set(false);
      },
    });
  }

  volverALista() {
    this._router.navigate(['/chefs']);
  }

  editarChef(chef: IChef) {
    const dialogRef = this._dialog.open(ChefForm, {
      width: '480px',
      data: chef
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cargarDetalle(chef.id);
      }
    });
  }

  eliminarChef(chef: IChef) {
    const saveSubject = new Subject<void>();

    saveSubject.subscribe(() => {
      this.loading.set(true);
      this._chefService.deleteChef(chef.id).subscribe({
        next: () => {
          this.loading.set(false);
          this._snackBar.open(
            `Cocinero "${chef.name}" eliminado correctamente`,
            'Cerrar',
            { duration: 2000 }
          );
          dialogRef.close(true);
        },
        error: () => {
          this.loading.set(false);
          this._snackBar.open(
            'Error al eliminar al cocinero',
            'Cerrar',
            { duration: 2000 }
          );
        }
      });
    });

    const dialogRef = this._dialog.open(GenericDialog, {
      width: '420px',
      data: {
        title: 'Eliminar cocinero',
        message: `¿Estás seguro de que deseas eliminar al cocinero:`,
        subMessage: `"${chef.name}"? Esta acción no se puede deshacer.`,
        btnText: 'Eliminar',
        btnColor: 'warn',
        onSave: saveSubject,
        action: 'delete',
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      saveSubject.complete();
      if (result === true) {
        this.volverALista();
      }
    });
  }

  // Nota: Busque esta función para que al mostrar el createdAt sea más legible
  formatCreatedAt(createdAt: IChef['createdAt']): string {
    return new Intl.DateTimeFormat('es-ES', {
      dateStyle: 'long',
      timeStyle: 'short',
    }).format(new Date(createdAt));
  }
}
