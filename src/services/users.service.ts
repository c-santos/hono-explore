import { users } from '@/db/schemas/users.schema';
import { eq } from 'drizzle-orm';
import { db } from '@/db/db.config';

export const getUsers = async () => {
  return await db.select().from(users)
  //return await db.query.users.findMany();
};

export const getOneUserById = async (userId: string) => {
  return await db.query.users.findFirst({
    where: eq(users.id, userId),
  });
};

export const getUserByUsername = async (username: string) => {
  return await db.query.users.findFirst({
    where: eq(users.username, username),
  });
};
