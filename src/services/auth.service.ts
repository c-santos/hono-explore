import { registerUserDto } from '@/types/auth.types';
import * as a2 from 'argon2';
import { HTTPException } from 'hono/http-exception';
import { UsersService } from './users.service';

export class AuthService {
  constructor() {}

  async registerUser(data: registerUserDto) {
    try {
      if (!data.password)
        throw new HTTPException(400, {
          message: 'Could not register user',
          cause: 'password is empty',
        });

      const hashed = await a2.hash(data.password);
      delete data.password;

      const user = await UsersService.createUser({
        username: data.username,
        password: hashed,
      });

      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
