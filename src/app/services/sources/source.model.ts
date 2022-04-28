interface Credentials {
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
  ownerId: string;
  favorited: boolean;
}
