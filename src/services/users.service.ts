import { users } from '@/db/schemas/index.schema';
import { eq } from 'drizzle-orm';
import { db } from '@/db/db.config';
import { CreateUserDto } from '@/types/users.type';

export const UsersService = {
  getUsers: async () => {
    return await db.select().from(users);
    //return await db.query.users.findMany();
  },
  getOneUserById: async (userId: string) => {
    return await db.query.users.findFirst({
      where: eq(users.id, userId),
    });
  },
  getUserByUsername: async (username: string) => {
    return await db.query.users.findFirst({
      where: eq(users.username, username),
    });
  },
  createUser: async (data: CreateUserDto) => {
    const user = await db.insert(users).values(data).returning();
    return user;
  },
};
