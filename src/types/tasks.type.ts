import { z } from 'zod';
import tasks from '@/db/schemas/tasks.schema';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

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

export const getOneTaskDto = createSelectSchema(tasks).pick({ id: true });

export const createTaskDto = createInsertSchema(tasks).omit({
  id: true,
  created_at: true,
  deleted_at: true,
  updated_at: true,
});

export const updateTaskStatusParam = createSelectSchema(tasks).pick({
  id: true,
});

export const updateTaskStatusBody = z.object({ completed: z.string() })

export type GetOneTaskDto = z.infer<typeof getOneTaskDto>;
export type CreateTaskDto = z.infer<typeof createTaskDto>;
export type UpdateTaskStatusParam = z.infer<typeof updateTaskStatusParam>;
export type UpdateTaskStatusBody = z.infer<typeof updateTaskStatusBody>;
