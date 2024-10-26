import tasks from '@/db/schemas/tasks.schema';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const getOneTaskDto = createSelectSchema(tasks).pick({ id: true });

export const createTaskDto = createInsertSchema(tasks).omit({
  id: true,
  created_at: true,
  deleted_at: true,
  updated_at: true,
});

export const updateTaskStatusParam = z.object({
  id: z.string().uuid(),
});

export const updateTaskStatusBody = z.object({
  status: z.boolean(),
});

export type UpdateTaskStatusParam = z.infer<typeof updateTaskStatusParam>;
export type UpdateTaskStatusBody = z.infer<typeof updateTaskStatusBody>;
