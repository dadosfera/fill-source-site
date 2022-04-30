import { Injectable } from '@angular/core';
import {
  PostgrestFilterBuilder,
  PostgrestSingleResponse,
} from '@supabase/postgrest-js';
import {
  ApiError,
  AuthChangeEvent,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';

import { environment } from '../../../environments/environment';
import { SourceDatabase, SourceDatabaseKey } from '../sources/source.model';
import { IUser } from './user.model';

const REDIRECT_URL =
  'https://sites.google.com/datasprints.com/datasprints-wiki/home';

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

  public getUser(): User | null {
    return this.supabaseClient.auth.user();
  }

  public getSession(): Session | null {
    return this.supabaseClient.auth.session();
  }

  public async getProfile(): Promise<
    PostgrestSingleResponse<{ username: string; hash: string }>
  > {
    const user = this.getUser();

    return this.supabaseClient
      .from('profiles')
      .select('username, hash')
      .eq('id', user?.id)
      .single();
  }

  public authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ): any {
    return this.supabaseClient.auth.onAuthStateChange(callback);
  }

  public async signIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<{
    user: User | null;
    error: ApiError | null;
    session: Session | null;
  }> {
    return this.supabaseClient.auth.signIn(
      { email, password },
      {
        redirectTo: REDIRECT_URL,
      }
    );
  }

  public async signUp({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<{
    user: User | null;
    error: ApiError | null;
    session: Session | null;
  }> {
    return this.supabaseClient.auth.signUp(
      { email, password },
      {
        redirectTo: REDIRECT_URL,
      }
    );
  }

  public signOut(): Promise<{ error: ApiError | null }> {
    return this.supabaseClient.auth.signOut();
  }

  public updateProfile(userUpdate: IUser): PostgrestFilterBuilder<boolean> {
    const user = this.getUser();

    const update = {
      username: userUpdate.username,
      id: user?.id,
      updated_at: new Date(),
    };

    return this.supabaseClient.from('profiles').upsert(update, {
      returning: 'minimal',
    });
  }

  public createSource(source: SourceDatabase): PostgrestFilterBuilder<boolean> {
    return this.supabaseClient.from('sources').upsert(
      {
        ...source,
        fk_profiles_sources: this.getUser()?.id,
      },
      {
        returning: 'minimal',
      }
    );
  }

  public deleteSource(id: number): PostgrestFilterBuilder<boolean> {
    return this.supabaseClient
      .from('sources')
      .delete({ returning: 'representation' as any })
      .match({ id, fk_profiles_sources: this.getUser()?.id });
  }

  public getSources(): PostgrestFilterBuilder<SourceDatabaseKey> {
    return this.supabaseClient
      .from('sources')
      .select()
      .order('updated_at', { ascending: false });
  }

  get client() {
    return this.supabaseClient;
  }
}
