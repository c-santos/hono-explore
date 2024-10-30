import { AuthService } from '@/services/auth.service';
import {
  LoginDto,
  loginDto,
  RegisterDto,
  registerDto,
} from '@/types/auth.types';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';

const authRouter = new Hono().basePath('/auth');

authRouter.post('/register', zValidator('form', registerDto), async (c) => {
  const body = await c.req.parseBody<RegisterDto>();
  const authService = new AuthService();
  const user = await authService.registerUser(body);
  console.log('[INFO][auth.register] registered user: ', user);
  return c.json(user);
});

authRouter.post('/login', zValidator('form', loginDto), async (c) => {
  const body = await c.req.parseBody<LoginDto>();
  const authService = new AuthService();
  const user = await authService.login(body);
  console.log('[INFO][auth.login] logged in user: ', user);
  return c.redirect(`/profile/${user.id}`);
});

export default authRouter;
