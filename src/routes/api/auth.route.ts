import { AuthService } from '@/services/auth.service';
import { loginUserDto } from '@/types/auth.dto';
import { LoginUserDto } from '@/types/auth.types';
import { createUserDto } from '@/types/users.dto';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';

const authRouter = new Hono().basePath('/auth');

authRouter.post('/register', zValidator('json', createUserDto), async (c) => {
  const body = await c.req.json();
  const authService = new AuthService();
  const user = await authService.registerUser(body);
  return c.json(user);
});

authRouter.post('/login', zValidator('form', loginUserDto), async (c) => {
  const body = await c.req.parseBody<LoginUserDto>();
  const authService = new AuthService();
  const user = await authService.login(body);
  console.log('[INFO][auth.login] logged in user: ', user);
  return c.redirect(`/profile/${user.id}`);
});

export default authRouter;
