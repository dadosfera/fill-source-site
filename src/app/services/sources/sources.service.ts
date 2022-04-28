import { Injectable } from '@angular/core';
import { SourceFirebase } from './source.model';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class SourcesService {
  ref = '/sources';
  sourcesList: AngularFireList<SourceFirebase>;

  constructor(private db: AngularFireDatabase) {
    this.sourcesList = this.db.list(this.ref);
  }

  store(source: SourceFirebase) {
    return this.sourcesList.push(source);
  }

  get() {
    return this.sourcesList.snapshotChanges();
  }
}
