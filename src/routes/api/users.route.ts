import { UsersService } from '@/services/users.service';
import { CreateUserDto, createUserDto } from '@/types/users.dto';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';

const usersRouter = new Hono().basePath('/users');

usersRouter
  .get('/', async (c) => {
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
  })
  .post('/', zValidator('form', createUserDto), async (c) => {
    const body = await c.req.json<CreateUserDto>();
    const user = await UsersService.createUser(body);

    return c.json(user)
  });

export default usersRouter;
