import { Injectable } from '@angular/core';
import { NbToastrService } from '@beast/theme';
import { AES, enc } from 'crypto-js';
import hashDefault from 'src/app/services/encrypt/hash';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class EncryptService {
  constructor(
    private supabaseService: SupabaseService,
    private toastService: NbToastrService
  ) {}

  async encrypt(data: any) {
    const profile = await this.supabaseService.getProfile();

    if (profile.error) {
      this.toastService.danger(profile.error.message, profile.error.code);
      return null;
    }

    const hash = profile.data?.hash || hashDefault;
    return AES.encrypt(JSON.stringify(data), hash || hashDefault).toString();
  }

  async decrypt(data: string) {
    const profile = await this.supabaseService.getProfile();

    if (profile.error) {
      this.toastService.danger(profile.error.message, profile.error.code);
      return null;
    }

    const hash = profile.data?.hash || hashDefault;
    const aes = AES.decrypt(data, hash || hashDefault);
    return JSON.parse(aes.toString(enc.Utf8));
  }
}
