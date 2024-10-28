import { z } from 'zod';

export const User = z.object({
  id: z.string(),

  createdAt: z.string().date(),
  updatedAt: z.string().date(),
  deletedAt: z.string().date().optional(),

  username: z.string(),
});

export type User = z.infer<typeof User>;
