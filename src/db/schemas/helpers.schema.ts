import { timestamp } from 'drizzle-orm/pg-core';

const timestamps = {
  created_at: timestamp({ mode: 'string' }).defaultNow().notNull(),
  updated_at: timestamp({ mode: 'string' }).defaultNow().notNull(),
  deleted_at: timestamp(),
};

export { timestamps };
