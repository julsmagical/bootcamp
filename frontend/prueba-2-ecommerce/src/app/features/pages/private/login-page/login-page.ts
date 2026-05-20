import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/private/auth-service';
import { Router } from '@angular/router';
//angular material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-page',
  imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  loading = signal(false);
  error = signal('');
  showPass = signal(false);

  form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
  });

  onSubmit() {
      if (this.form.invalid) {
          this.form.markAllAsTouched();
          return;
      }

      this.loading.set(true);
      this.error.set('');

      const { username, password } = this.form.value;

      this.auth.login({ username: username!, password: password! }).subscribe({
          next: () => {
              this.snackBar.open('¡Bienvenido!', 'Cerrar', { duration: 3000 });
              this.router.navigate(['/admin/dashboard']);
          },
          error: () => {
              this.loading.set(false);
              this.error.set('Usuario o contraseña incorrectos.');
          },
      });
  }
}
