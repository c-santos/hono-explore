import { Hono } from 'hono';
import usersRouter from './users.route';
import tasksRouter from './tasks.route';
import authRouter from './auth.route';

const apiRouter = new Hono().basePath('/api');

apiRouter.route('/', authRouter);
apiRouter.route('/', usersRouter);
apiRouter.route('/', tasksRouter);

export default apiRouter;
