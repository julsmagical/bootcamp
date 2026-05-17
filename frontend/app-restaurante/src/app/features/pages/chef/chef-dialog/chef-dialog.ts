import { Component, inject, signal } from '@angular/core';
import { IChef } from '../../../interfaces/chefs';
import { ChefService } from '../../../services/chef-service';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenericDialog } from '../../../../shared/components/generic-dialog/generic-dialog';

@Component({
  selector: 'app-chef-dialog',
  imports: [],
  templateUrl: './chef-dialog.html',
  styleUrl: './chef-dialog.scss',
})
export class ChefDialog {
  private _chefService = inject(ChefService);
  private snackBar = inject(MatSnackBar);
  private dialogData = inject(MAT_DIALOG_DATA);

  chef: IChef | null = null;
  loading = signal(false);

  ngOnInit() {
    if (this.dialogData) {
      this.chef = this.dialogData.chef;
      this.dialogData.onSave?.subscribe(() => this.eliminar());
    }
  }

  eliminar() {
    if (!this.chef) return;
    this.loading.set(true);

    this._chefService.deleteChef(this.chef.id).subscribe({
      next: () => {
        this.loading.set(false);
        this.snackBar.open(
          `Chef "${this.chef?.name}" eliminada correctamente`,
          'Cerrar',
          { duration: 2000 }
        );

        this.dialogData.dialogRef?.close(true); //cerrar el dialog y actualizar 
      },

      error: () => {
        this.loading.set(false);
        this.snackBar.open(
          'Error al eliminar al chef',
          'Cerrar',
          { duration: 2000 }
        );
      }
    });
  }

  cancelar() {
    this.dialogData.dialogRef.close(false);
  }
}
