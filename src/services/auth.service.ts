import {
  JwtPayload,
  LoginDto,
  LoginResponseDto,
  RegisterDto,
} from '@/types/auth.types';
import * as a2 from 'argon2';
import { HTTPException } from 'hono/http-exception';
import { UsersService } from './users.service';
import { sign, verify } from 'hono/jwt';
import { getEnvValue } from '@/config';

export class AuthService {
  constructor() {}

  async registerUser(data: RegisterDto) {
    try {
      if (!data.password)
        throw new HTTPException(400, {
          message: 'Could not register user',
          cause: 'password is empty',
        });

      const hashed = await a2.hash(data.password);

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

  async login(data: LoginDto): Promise<LoginResponseDto> {
    const user = await UsersService.getUserByUsername(data.username);

    if (!user || !user.password) {
      throw new HTTPException(400, {
        message: 'Check login credentials',
        cause: 'user does not exist',
      });
    }

    const compare = await a2.verify(user.password, data.password);

    if (!compare) {
      throw new HTTPException(400, {
        message: 'Check login credentials',
        cause: 'invalid credentials',
      });
    }

    const accessToken = await this.createToken(
      user.id,
      parseInt(getEnvValue('ACCESS_TOKEN_EXPIRY')),
      getEnvValue('ACCESS_TOKEN_SECRET'),
    );

    const refreshToken = await this.createToken(
      user.id,
      parseInt(getEnvValue('REFRESH_TOKEN_EXPIRY')),
      getEnvValue('REFRESH_TOKEN_SECRET'),
    );

    return {
      tokens: {
        access_token: accessToken,
        refresh_token: refreshToken,
      },
      user: user,
    };
  }

  async createToken(userId: string, expiresMs: number, secret: string) {
    const payload: JwtPayload = {
      userId,
      expiresMs: expiresMs,
    };
    const token = await sign(payload, secret);
    return token;
  }

  async verifyToken(token: string, secret: string) {
    const verified = await verify(token, secret);
    return verified;
  }
}
