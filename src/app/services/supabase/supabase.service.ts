import { Injectable } from '@angular/core';
import {
  ApiError,
  AuthChangeEvent,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabaseClient: SupabaseClient;

  constructor() {
    this.supabaseClient = createClient(
      environment.supabase.url,
      environment.supabase.key
    );
  }

  public resetPassword(
    accessToken: string,
    password: string
  ): Promise<{
    user: User | null;
    data: User | null;
    error: ApiError | null;
  }> {
    return this.supabaseClient.auth.api.updateUser(accessToken, { password });
  }

  public authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ): any {
    return this.supabaseClient.auth.onAuthStateChange(callback);
  }
}
