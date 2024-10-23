import * as p from 'drizzle-orm/pg-core';
import { timestamps } from './schema.helpers';

export const users = p.pgTable(
  'users',
  {
    ...timestamps,
    id: p.uuid().primaryKey(),
    username: p.text().notNull().unique(),
  },
  (table) => {
    return {
      usernameIndex: p.uniqueIndex('username_idx').on(table.username),
    };
  },
);
