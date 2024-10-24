import { TasksService } from '@/services/tasks.service';
import { createTaskDto, getOneTaskDto } from '@/types/tasks.dto';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';

const tasksRoute = new Hono();

tasksRoute.get('/', async (c) => {
  const tasks = await TasksService.getTasks();
  return c.json({ tasks: tasks });
});

tasksRoute.get('/:id', zValidator('param', getOneTaskDto), (c) => {
  const id: string = c.req.param('id');
  const task = TasksService.getOneTask(id);

  if (!task) {
    return c.json({ message: 'Task not found' }, 404);
  }

  return c.json({ data: task });
});

tasksRoute.post('/', zValidator('json', createTaskDto), async (c) => {
  const body = await c.req.json();

  const created = await TasksService.createTask(body);
  if (!created) {
    return c.json(
      {
        message: 'Could not create task',
      },
      500,
    );
  }

  return c.json({
    data: created,
  });
});

export default tasksRoute;
