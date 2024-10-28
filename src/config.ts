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
};

export const getEnvValue = (key: keyof Env, throwOnMissing = true) => {
  const env = process.env;
  const value = env[key];
  if (!value && throwOnMissing) console.log(`Missing config: ${key}`);

  return value;
};
