import { z } from 'zod';
import users from '@/db/schemas/users.schema';
import { createInsertSchema } from 'drizzle-zod';

export const User = z.object({
  id: z.string(),

  createdAt: z.string().date(),
  updatedAt: z.string().date(),
  deletedAt: z.string().date().optional(),

  username: z.string(),
});

export type User = z.infer<typeof User>;

export const createUserDto = createInsertSchema(users).omit({
  id: true,
  created_at: true,
  updated_at: true,
  deleted_at: true,
});

export type CreateUserDto = z.infer<typeof createUserDto>
