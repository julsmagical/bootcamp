import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/private/auth-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

//angular mateiral
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatSnackBarModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  loading = signal(false);
  showPass = signal(false);

  //validaciones básicas
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    const { email, password } = this.form.value;

    this.auth.login({ username: email!, password: password! }).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.snackBar.open('Sesión iniciada correctamente', 'Cerrar', { duration: 2000 });
        //redirigir al dashboard
        this.router.navigate(['/admin/dashboard']);
      },
      //manejo de errores
      error: (err) => { 
        this.loading.set(false); 
        this.snackBar.open(err.error?.message || 'Error de autenticación', 'Cerrar', { duration: 2000 });
      },
    });
  }
}