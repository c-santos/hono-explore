import { TasksService } from '@/services/tasks.service';
import {
  createTaskDto,
  getOneTaskDto,
  UpdateTaskStatusBody,
  updateTaskStatusBody,
  updateTaskStatusParam,
} from '@/types/tasks.type';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';

const tasksRouter = new Hono().basePath('/tasks');

tasksRouter
  .get('/', async (c) => {
    const tasks = await TasksService.getTasks();
    return c.json({ tasks: tasks });
  })
  .get('/:id', zValidator('param', getOneTaskDto), (c) => {
    const id: string = c.req.param('id');
    const task = TasksService.getOneTask(id);

    if (!task) {
      return c.json({ message: 'Task not found' }, 404);
    }

    return c.json({ data: task });
  })
  .post('/', zValidator('json', createTaskDto), async (c) => {
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
  })
  .patch(
    '/:id',
    zValidator('param', updateTaskStatusParam),
    zValidator('form', updateTaskStatusBody),
    async (c) => {
      const { id } = c.req.param();
      const body = await c.req.parseBody<UpdateTaskStatusBody>();
      const completed = body.completed == 'true';
      const task = await TasksService.updateTaskStatus(id, completed);

      return c.json({
        task: task,
      });
    },
  );

export default tasksRouter;
