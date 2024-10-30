import { z } from 'zod';
import { createUserDto } from './users.type';
import { loginUserDto } from './auth.dto';

export type RegisterUserDto = z.infer<typeof createUserDto>;
export type LoginUserDto = z.infer<typeof loginUserDto>
