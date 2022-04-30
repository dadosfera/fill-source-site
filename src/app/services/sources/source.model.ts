export interface Credentials {
  database: string;
  endpoint: string;
  port: number;
  jdbc_user: string;
  jdbc_password?: string;
  schema: string;
}

export interface Source {
  plugin: string;
  credentials: Credentials;
}

export interface SourceDatabase {
  name: string;
  plugin: string;
  credentials: string;
  fk_profiles_sources: string;
}

export interface SourceDatabaseKey extends SourceDatabase {
  id: number;
}
