import type { NotFoundHandler } from 'hono';

export const notFound: NotFoundHandler = (c) => {
  return c.json(
    {
      message: `404 Not Found - ${c.req.path}`,
    },
    404,
  );
};
