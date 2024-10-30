import Login from '@/views/Login';
import { Hono } from 'hono';

const authViewRouter = new Hono();

authViewRouter.get('/login', async (c) => {
  return c.html(<Login />);
});
authViewRouter.get('/register', async (c) => {});

export default authViewRouter;
