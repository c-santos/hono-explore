import { Hono } from 'hono';
import * as userService from '@/services/users.service';

const usersRouter = new Hono();

usersRouter.get('/', async (c) => {
  try {
    const users = await userService.getUsers();

    return c.json({
      users: users,
    }, 200);
  } catch (error) {
    c.status(500)
    console.error(error);
  }
});

export default usersRouter;
