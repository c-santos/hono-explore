import { getEnvValue } from '@/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schemas/*',
  out: './src/db/migrations',
  dbCredentials: {
    host: getEnvValue('DB_HOST')!,
    port: Number(getEnvValue('DB_PORT')) || 5432,
    database: getEnvValue('DB_NAME')!,
    user: getEnvValue('DB_USER')!,
    password: getEnvValue('DB_PASS')!,
    ssl: false,
  },
});
