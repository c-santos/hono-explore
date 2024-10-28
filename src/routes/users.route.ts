import { UsersService } from '@/services/users.service';
import { Hono } from 'hono';

const usersRouter = new Hono();

usersRouter.get('/', async (c) => {
  try {
    const users = await UsersService.getUsers();

    return c.json(
      {
        users: users,
      },
      200,
    );
  } catch (error) {
    c.status(500);
    console.error(error);
  }
});

usersRouter.post('/', async (c) => {
  const body = await c.req.json();
  const user = await UsersService.createUser(body);

  return c.json(user);
});

export default usersRouter;
