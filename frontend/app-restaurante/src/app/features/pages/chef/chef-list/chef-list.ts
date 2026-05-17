import { Component, inject, signal } from '@angular/core';
import { ChefService } from '../../../services/chef-service';
import { IChef } from '../../../interfaces/chefs';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Subject } from 'rxjs';
import { GenericDialog } from '../../../../shared/components/generic-dialog/generic-dialog';
import { ChefForm } from '../chef-form/chef-form';
import { ChefDialog } from '../chef-dialog/chef-dialog';

@Component({
  selector: 'app-chef-list',
  imports: [MatCardModule, MatProgressSpinnerModule],
  templateUrl: './chef-list.html',
  styleUrl: './chef-list.scss',
})
export class ChefList {
  private _chefService = inject(ChefService);
  // Uso de signal
  chefs = signal<IChef[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit() {
    this.cargarCocineros();
  }

  cargarCocineros() {
    this.loading.set(true);
    this.error.set(null);

    this._chefService.getChefs().subscribe({
      next: (data) => {
        this.chefs.set(data);
        this.loading.set(false);
        console.log(this.chefs()[0]);
      },
      error: (err) => {
        this.error.set('Error al cargar los cocineros');
        this.loading.set(false);
      },
    });
  }

  verDetalle(id: string) {
    this.router.navigate(['/chefs', id]);
  }

  abrirFormulario(recipe: IChef | null = null) {
    const dialogRef = this.dialog.open(ChefForm, {
      width: '480px',
      data: recipe
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cargarCocineros();
      }
    });
  }

  abrirDialog(chef: IChef) {
    const saveSubject = new Subject<void>();

    const dialogRef = this.dialog.open(GenericDialog, {
      width: '420px',
      data: {
        title: 'Eliminar chef',
        subMessage: 'Esta acción no se puede deshacer.',
        btnText: 'Eliminar',
        btnColor: 'warn',
        component: ChefDialog,
        chef: chef,
        onSave: saveSubject,
        action: 'delete',
      }
    });

  dialogRef.componentInstance.data.dialogRef = dialogRef;

  dialogRef.afterClosed().subscribe((result) => {
    if (result === true) {
      this.cargarCocineros();
    }
  });
  }
}
