import tasks from '@/db/schemas/tasks.schema';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const getOneTaskDto = createSelectSchema(tasks).pick({ id: true });

export const createTaskDto = createInsertSchema(tasks).omit({
  id: true,
  created_at: true,
  deleted_at: true,
  updated_at: true,
});
