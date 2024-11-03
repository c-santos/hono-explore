import { getEnvValue } from '@/config';
import { AuthService } from '@/services/auth.service';
import {
  LoginDto,
  loginDto,
  RegisterDto,
  registerDto,
} from '@/types/auth.types';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { setCookie } from 'hono/cookie';

const authRouter = new Hono().basePath('/auth');

authRouter
  .post('/register', zValidator('form', registerDto), async (c) => {
    const body = await c.req.parseBody<RegisterDto>();
    const authService = new AuthService();
    const user = await authService.registerUser(body);
    console.log('[INFO][auth.register] registered user: ', user);
    return c.json(user);
  })
  .post('/login', zValidator('json', loginDto), async (c) => {
    const body = await c.req.json<LoginDto>();
    console.log('Login body: ', body)
    const authService = new AuthService();
    const { user, tokens } = await authService.login(body);

    const cookieExpiry = new Date(Date.now() + getEnvValue('COOKIE_EXPIRY'));

    setCookie(c, 'access_token', tokens.access_token, {
      httpOnly: true,
      expires: cookieExpiry,
    });

    setCookie(c, 'refresh_token', tokens.refresh_token, {
      httpOnly: true,
      expires: cookieExpiry,
    });

    console.log('[INFO][auth.login] logged in user: ', user);
    return c.json({ user, tokens });
  });

export default authRouter;
