import { serve } from '@hono/node-server';
import { logger } from 'hono/logger';
import { notFound } from './middlewares/not-found.js';
import { onError } from './middlewares/on-error.js';
import { prettyJSON } from 'hono/pretty-json';
import { Hono } from 'hono';
import { profileRouter } from './routes/profile.route.js';
import apiRouter from './routes/api/index.route..js';

const app = new Hono();

// middleware
app.use(prettyJSON());
app.use(logger());
app.notFound(notFound);
app.onError(onError);

// health check
app.get('/health', (c) => {
  return c.text('Hello Hono!');
});

// routes
app.route('/', apiRouter);
app.route('/profile', profileRouter);

// serve
const port = 8000;
console.log(port);
console.log(`Server is running on port http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
