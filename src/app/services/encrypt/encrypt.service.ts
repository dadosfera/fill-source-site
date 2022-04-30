import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-js';
import hashDefault from 'src/app/services/encrypt/hash';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class EncryptService {
  constructor(private supabaseService: SupabaseService) {}

  async encrypt(data: any) {
    const profile = await this.supabaseService.getProfile();
    const hash = profile.data?.hash || hashDefault;
    return AES.encrypt(JSON.stringify(data), hash || hashDefault).toString();
  }

  async decrypt(data: string) {
    const profile = await this.supabaseService.getProfile();
    const hash = profile.data?.hash || hashDefault;
    const aes = AES.decrypt(data, hash || hashDefault);
    return JSON.parse(aes.toString(enc.Utf8));
  }
}
