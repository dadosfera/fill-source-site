import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private supabaseService: SupabaseService) {}

  canActivate(): boolean | UrlTree {
    const isLogged = !!this.supabaseService.getSession();

    if (isLogged) {
      return true;
    }

    this.supabaseService.signOut();
    return false;
  }
}
