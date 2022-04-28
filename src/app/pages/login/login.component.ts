import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@beast/theme';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: NbToastrService
  ) {}

  loginWithGoogle() {
    this.authService
      .loginWithGoogle()
      .then((data) => {
        const email = data.user?.email || '';
        if (email.includes('dadosfera') || email.includes('datasprints')) {
          this.router.navigate(['/home']);
          return;
        }

        throwError(() => 'E-mail is not supported');
      })
      .catch(() => {
        this.toastService.danger('Ocorreu um erro ao fazer o login', 'Ops!');
      });
  }
}
