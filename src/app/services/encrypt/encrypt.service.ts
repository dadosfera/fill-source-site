import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-js';
import hash from 'src/app/services/encrypt/hash';

@Injectable({
  providedIn: 'root',
})
export class EncryptService {
  constructor() {}

  encrypt(data: any) {
    return AES.encrypt(JSON.stringify(data), hash).toString();
  }

  decrypt(data: string) {
    const aes = AES.decrypt(data, hash);
    return JSON.parse(aes.toString(enc.Utf8));
  }
}
