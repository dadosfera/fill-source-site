import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  async canActivate(): Promise<boolean | UrlTree> {
    const isLogged = await this.authService.isLoggedIn();

    if (isLogged) {
      return true;
    }

    this.authService.logout();
    return false;
  }
}
