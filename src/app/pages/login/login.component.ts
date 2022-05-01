import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@beast/theme';
import { SupabaseService } from 'src/app/services/supabase/supabase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  password = '';
  confirmPassword = '';
  loading = false;

  view = 'home';

  fragment = '';

  constructor(
    private toastService: NbToastrService,
    private supabaseService: SupabaseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        this.fragment = fragment;

        if (fragment.includes('type=signup')) {
          this.view = 'confirm';
          return;
        }

        if (fragment.includes('type=recovery')) {
          this.view = 'password';
          return;
        }

        if (fragment.includes('type=magiclink')) {
          this.view = 'magic';
          return;
        }
      }
    });
  }

  async resetPassword() {
    if (
      this.confirmPassword.trim().length > 5 &&
      this.password.trim().length > 5 &&
      this.confirmPassword === this.password
    ) {
      this.loading = true;
      const splitted = this.fragment.split('&');
      const accessString = splitted.find((i) => i.includes('access_token'));
      const accessToken = accessString?.split('=')[1] as string;

      const { error } = await this.supabaseService.resetPassword(
        accessToken,
        this.password.trim()
      );

      if (error) {
        this.toastService.danger(error.message, error.status, {
          duration: 5000,
        });
        this.loading = false;
        return;
      }

      this.toastService.success('Senha resetada com sucesso!', 'Tudo certo!', {
        duration: 5000,
      });
      this.password = '';
      this.confirmPassword = '';
      this.loading = false;
      this.view = 'home';
    }
  }
}
