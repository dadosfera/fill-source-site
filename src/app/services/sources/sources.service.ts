import { Injectable } from '@angular/core';
import { SourceFirebase } from './source.model';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SourcesService {
  baseRef = '/sources';
  sourcesList: AngularFireList<SourceFirebase>;

  constructor(private db: AngularFireDatabase, private auth: AuthService) {
    this.sourcesList = this.db.list(
      `${this.baseRef}/${this.auth.user?.uid}`,
      (ref) => ref.orderByChild('name')
    );
  }

  store(source: SourceFirebase) {
    return this.sourcesList.push(source);
  }

  delete(key: string) {
    return this.sourcesList.remove(key);
  }

  get() {
    return this.sourcesList.snapshotChanges();
  }
}
