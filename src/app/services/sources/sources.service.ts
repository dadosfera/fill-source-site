import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase/supabase.service';
import { SourceDatabase } from './source.model';

@Injectable({
  providedIn: 'root',
})
export class SourcesService {
  constructor(private supabaseService: SupabaseService) {}

  store(source: SourceDatabase) {
    return this.supabaseService.createSource(source);
  }

  delete(id: number) {
    return this.supabaseService.deleteSource(id);
  }

  get() {
    return this.supabaseService.getSources();
  }
}
