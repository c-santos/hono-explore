import type { ErrorHandler } from 'hono';
import type { StatusCode } from 'hono/utils/http-status';

export const onError: ErrorHandler = (err, c) => {
  console.error(err)
  return 'status' in err
    ? c.json(
        {
          message: err.message,
          stack: err.stack,
        },
        err.status as StatusCode,
      )
    : c.json(
        {
          message: err.message,
          stack: err.stack,
        },
        500,
      );
};
