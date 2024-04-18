export interface AppConfig {
  DB_TYPE: string;
  DB_PORT: string;
  DB_HOST: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  JWT_TOKEN_SECRET: string;
  JWT_REFRESH_TOKEN_SECRET: string;
  JWT_TOKEN_EXP: string;
  JWT_REFRESH_TOKEN_EXP: string;
}
