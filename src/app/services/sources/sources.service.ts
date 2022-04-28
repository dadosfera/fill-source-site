import { Injectable } from '@angular/core';
import {} from '@angular/fire/database';
import { Source } from './source.model';

@Injectable({
  providedIn: 'root',
})
export class SourcesService {
  private dbPath = '/sources';

  constructor() {}
}
