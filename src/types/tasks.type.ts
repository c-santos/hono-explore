import { z } from 'zod';

export const Task = z.object({
  id: z.string(),

  createdAt: z.string().date(),
  updatedAt: z.string().date(),
  deletedAt: z.string().date().optional(),

  title: z.string(),
  body: z.string(),
  userId: z.string().uuid(),
  completed: z.boolean(),
  dueDate: z.string().optional(),
});

export type Task = z.infer<typeof Task>;
