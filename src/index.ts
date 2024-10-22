import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import tasksRouter from './tasks.route.js';
import { logger } from 'hono/logger';
import { notFound } from './middlewares/not-found.js';
import { onError } from './middlewares/on-error.js';

const app = new Hono();

app.use(logger());
app.notFound(notFound);
app.onError(onError);

// health check
app.get('/health', (c) => {
  return c.text('Hello Hono!');
});

// routes
app.route('/tasks', tasksRouter);

// serve
const port = 8000;
console.log(port)
console.log(`Server is running on port http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
