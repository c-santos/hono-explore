import { Hono } from 'hono';

type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

const tasks: Task[] = [
  {
    id: '1',
    title: 'Task 1',
    description: 'This is task 1',
    completed: false,
  },
  {
    id: '2',
    title: 'Task 2',
    description: 'This is task 2',
    completed: true,
  },
];

const tasksRoute = new Hono();

tasksRoute.get('/', (c) => {
  return c.json({
    data: tasks,
  });
});

tasksRoute.get('/:id', (c) => {
  const id: string = c.req.param('id');

  const task = tasks[parseInt(id)];

  return c.json({
    data: task,
  });
});

tasksRoute.post('/', async (c) => {
  const body = await c.req.json()
})

export default tasksRoute;
