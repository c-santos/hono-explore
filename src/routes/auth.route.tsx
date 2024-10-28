import { AuthService } from '@/services/auth.service';
import { createUserDto } from '@/types/users.dto';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';

const authRouter = new Hono();

authRouter.post('/register', zValidator('json', createUserDto), async (c) => {
  const body = await c.req.json();
  const authService = new AuthService();
  const user = await authService.registerUser(body);
  return c.json(user);
});

authRouter.post('/login', zValidator('json', createUserDto), async (c) => {
  const body = await c.req.json();
  const authService = new AuthService();
  const user = await authService.login(body);
  return c.json(user);
});

export default authRouter;
