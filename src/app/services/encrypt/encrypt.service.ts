import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-js';
import hashDefault from 'src/app/services/encrypt/hash';
import { KeysService } from '../keys/keys.service';

@Injectable({
  providedIn: 'root',
})
export class EncryptService {
  constructor(private keysService: KeysService) {}

  async encrypt(data: any) {
    const hash = await this.keysService.get();
    return AES.encrypt(JSON.stringify(data), hash || hashDefault).toString();
  }

  async decrypt(data: string) {
    const hash = await this.keysService.get();
    const aes = AES.decrypt(data, hash || hashDefault);
    return JSON.parse(aes.toString(enc.Utf8));
  }
}
