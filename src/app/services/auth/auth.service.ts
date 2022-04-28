import { Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  authState,
  user,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { first, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private router: Router) {}

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logout() {
    this.router.navigate(['/login']);
    return signOut(this.auth);
  }

  isLoggedIn() {
    return firstValueFrom(authState(this.auth).pipe(first()));
  }

  get user() {
    return this.auth.currentUser;
  }
}
