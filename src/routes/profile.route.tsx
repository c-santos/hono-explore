import { getOneUserById } from '@/services/users.service';
import Profile from '@/views/Profile';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';

export const profileRouter = new Hono();

profileRouter.get('/:id', async (c) => {
  const id = c.req.param('id');
  const user = await getOneUserById(id);
  if (!user) {
    throw new HTTPException(500, {
      message: 'user does not exist',
      cause: user,
    });
  }

  return c.html(
    <Profile username={user.username} createdAt={user.created_at} />,
  );
});
