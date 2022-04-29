import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@beast/theme';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { KeysService } from 'src/app/services/keys/keys.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: NbToastrService,
    private keysService: KeysService
  ) {}

  loginWithGoogle() {
    this.authService
      .loginWithGoogle()
      .then(async (data) => {
        const email = data.user?.email || '';
        if (email.includes('dadosfera') || email.includes('datasprints')) {
          const key = await this.keysService.get();

          if (!key) {
            await this.keysService.store();
          }

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
