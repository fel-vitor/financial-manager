import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { LoginFacadeService } from '../../facades/login-facade.service';
import { UserCredentials } from '../../interfaces/user-credentials';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  loginFacadeService = inject(LoginFacadeService);

  form = new FormGroup({
    user: new FormControl('', {
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  submit() {
    if (this.form.invalid) {
      return;
    }

    const payload: UserCredentials = {
      user: this.form.controls.user.value as string,
      password: this.form.controls.password.value as string,
    };

    this.loginFacadeService.login(payload).subscribe({
      next: (_) => {
        this.router.navigate(['']);
      },
      error: (res: HttpErrorResponse) => {
        if (res.status === 401) {
          this.form.setErrors({
            wrongCredentials: true,
          });
        }
      },
    });
  }
}
