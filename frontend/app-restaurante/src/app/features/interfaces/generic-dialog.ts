import { Type } from '@angular/core';
import { Subject } from 'rxjs';

// nota: se creo esta interface para tenerlo separado del .ts
export interface IGenericDialog {
  title: string;
  component?: Type<unknown>;
  // como el dialog es generico, se usa el unknown para que puedan usarse otras estructuras
  // diferente a any porque si obliga a comprobar el tipo
  message?: string; 
  subMessage?: string;
  btnText?: string;
  btnColor?: 'primary' | 'accent' | 'warn';
  action?: 'save' | 'delete' | 'edit';
  id?: string | null;
  onSave?: Subject<void>;
}