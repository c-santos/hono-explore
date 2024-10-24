import { db } from '@/db/db.config';
import { tasks } from '@/db/schemas/index.schema';
import { eq } from 'drizzle-orm';

export const TasksService = {
  getTasks: async () => {
    const task = await db.select().from(tasks);
    console.log('Task: ', task);
    return task;
  },
  getOneTask: (id: string) => {
    return db.query.tasks.findFirst({
      where: eq(tasks.id, id),
      with: { user: true },
    });
  },
  getTasksByUser: (userId: string) => {
    return db.query.tasks.findMany({
      where: eq(tasks.userId, userId),
      with: { user: true },
    });
  },
  createTask: async (data: any) => {
    return await db.insert(tasks).values(data).returning();
  },
  updateTaskStatus: async (taskId: string, status: boolean) => {
    return await db
      .update(tasks)
      .set({ completed: status })
      .where(eq(tasks.id, taskId))
      .returning();
  },
};
