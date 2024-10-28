import { UsersService } from '@/services/users.service';
import { createUserDto } from '@/types/users.dto';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';

const authRouter = new Hono();

authRouter.post('/register', zValidator('json', createUserDto), async (c) => {
  const body = await c.req.json();
  const user = await UsersService.createUser(body);
  return c.json(user);
});

export default authRouter;
