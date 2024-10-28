import users from '@/db/schemas/users.schema';
import { createInsertSchema } from 'drizzle-zod';

export const createUserDto = createInsertSchema(users).omit({
  id: true,
  created_at: true,
  updated_at: true,
  deleted_at: true,
});

