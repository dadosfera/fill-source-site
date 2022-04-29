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

export interface SourceFirebase {
  name: string;
  plugin: string;
  credentials: string;
  uid: string;
  favorited: boolean;
}

export interface SourceFirebaseKey extends SourceFirebase {
  key?: string | null;
}
