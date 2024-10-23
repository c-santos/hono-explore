import { db } from '@/db/db.config';
import { users } from '@/db/schemas/users.schema';
import { drizzle } from 'drizzle-orm/node-postgres';

export const getUsers = async () => {
  return await db.select().from(users);
};
