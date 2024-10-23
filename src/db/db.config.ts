import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { getEnvValue } from '@/config';

const pool = new Pool({
  host: getEnvValue('DB_HOST'),
  port: Number(getEnvValue('DB_PORT')) || 5743,
  database: getEnvValue('DB_NAME'),
  user: getEnvValue('DB_USER'),
  password: getEnvValue('DB_PASS'),
  ssl: false
});

export const db = drizzle({ client: pool })

