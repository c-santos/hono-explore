import { getEnvValue } from '@/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg'
import * as users from './schemas/users.schema';

const pool = new pg.Pool({
  host: getEnvValue('DB_HOST'),
  port: parseInt(getEnvValue('DB_PORT')!) || 5743,
  database: getEnvValue('DB_NAME'),
  user: getEnvValue('DB_USER'),
  password: getEnvValue('DB_PASS'),
  ssl: false,
});

export const db = drizzle(pool, {
  schema: {
    ...users,
  },
});
