import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class KeysService {
  baseRef = '/keys';
  keysObject: AngularFireObject<string>;

  constructor(private db: AngularFireDatabase, private auth: AuthService) {
    this.keysObject = this.db.object(`${this.baseRef}/${this.auth.user?.uid}`);
    // this.keysObject = this.db.(`${this.baseRef}/${this.auth.user?.uid}`);
  }

  store() {
    const uuid = uuidv4();
    return this.keysObject.set(uuid);
  }

  get() {
    return firstValueFrom(this.keysObject.valueChanges());
  }
}
