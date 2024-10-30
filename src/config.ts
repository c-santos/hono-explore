import { configDotenv } from 'dotenv';

configDotenv();

export type Env = {
  PORT: string;
  NODE_ENV: string;
  DB_HOST: string;
  DB_PORT: string;
  DB_NAME: string;
  DB_USER: string;
  DB_PASS: string;
  DB_URL: string;
  APP_TITLE: string;
  ACCESS_TOKEN_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
  ACCESS_TOKEN_EXPIRY: string;
  REFRESH_TOKEN_EXPIRY: string;
  COOKIE_EXPIRY: string;
};

export const getEnvValue = (key: keyof Env) => {
  const env = process.env;
  const value = env[key];

  if (!value) {
    throw new Error(`Missing config: ${key}`);
  }

  return value;
};
