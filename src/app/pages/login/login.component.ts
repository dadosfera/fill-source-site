import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@beast/theme';
import { SupabaseService } from 'src/app/services/supabase/supabase.service';
import { IUser } from 'src/app/services/supabase/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;

  login = false;

  constructor(
    private toastService: NbToastrService,
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  async loginWithEmail() {
    this.loading = true;

    const { error, user } = await this.supabaseService.signIn({
      email: this.email,
      password: this.password,
    });

    if (error) {
      this.toastService.danger('Ocorreu um erro ao fazer o login', 'Ops!');
      this.loading = false;
      return;
    }

    if (user && !user.email_confirmed_at) {
      this.toastService.danger('E-mail não confirmado', 'Ops!');
      this.loading = false;
      return;
    }

    const profile = await this.supabaseService.getProfile();

    if (profile.error || !profile.data?.hash) {
      const username = user?.email?.split('@')[0];
      const updated = await this.supabaseService.updateProfile({
        username,
      } as IUser);

      if (updated.error) {
        this.toastService.danger('Ocorreu um erro ao atualizar o hash', 'Ops!');
        this.loading = false;
        return;
      }
    }

    this.loading = false;
    this.router.navigate(['/home']);
  }

  async registerWithEmail() {
    this.loading = true;

    const { error } = await this.supabaseService.signUp({
      email: this.email,
      password: this.password,
    });

    if (error) {
      this.toastService.danger(error.message, error.status);
      this.loading = false;
      return;
    }

    this.login = true;
    this.loading = false;
    this.toastService.success(
      'Um e-mail de confirmação foi enviado',
      'Sucesso!',
      {
        duration: 5000,
      }
    );
  }

  toggleLogin() {
    this.login = !this.login;
  }

  loginOrRegister() {
    if (
      this.email.trim() &&
      this.password.trim() &&
      this.email.endsWith('@dadosfera.ai')
    ) {
      if (this.login) {
        this.loginWithEmail();
      } else {
        this.registerWithEmail();
      }
    }
  }
}
