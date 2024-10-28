import * as p from 'drizzle-orm/pg-core';
import { timestamps } from './helpers.schema';

const users = p.pgTable(
  'users',
  {
    ...timestamps,
    id: p.uuid().primaryKey().defaultRandom(),
    username: p.text().notNull().unique(),
    password: p.text(),
  },
  (table) => {
    return {
      usernameIndex: p.uniqueIndex('username_idx').on(table.username),
    };
  },
);

export default users;
