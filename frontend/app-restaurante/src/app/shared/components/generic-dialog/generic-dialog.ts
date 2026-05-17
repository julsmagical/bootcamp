import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { IGenericDialog } from '../../../features/interfaces/generic-dialog';
import { MatButtonModule } from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-generic-dialog',
  imports: [MatDialogModule, MatButtonModule, NgComponentOutlet],
  templateUrl: './generic-dialog.html',
  styleUrl: './generic-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenericDialog {
  public data = inject<IGenericDialog>(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<GenericDialog>);

  onSaveClick() {
    this.data.onSave?.next(); //para enviar al componente padre
    this.dialogRef.close(true);
  }
}
