import { db } from '@/db/db.config';
import { tasks } from '@/db/schemas/index.schema';
import { CreateTaskDto } from '@/types/tasks.type';
import { eq } from 'drizzle-orm';

export const TasksService = {
  getTasks: async () => {
    const task = await db.select().from(tasks);
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
  createTask: async (data: CreateTaskDto) => {
    return await db.insert(tasks).values(data).returning();
  },
  updateTaskStatus: async (taskId: string, completed: boolean) => {
    console.log('Status: ', completed);
    return await db
      .update(tasks)
      .set({ completed: completed })
      .where(eq(tasks.id, taskId))
      .returning();
  },
};
