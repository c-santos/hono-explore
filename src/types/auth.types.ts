import { z } from 'zod';

export const loginDto = z.object({
  username: z.string(),
  password: z.string(),
});

export const registerDto = z.object({
  username: z.string(),
  password: z.string(),
});

export type RegisterDto = z.infer<typeof registerDto>;
export type LoginDto = z.infer<typeof loginDto>;

export type JwtPayload = {
  userId: string;
  expiresMs: number;
};

export type LoginResponseDto = {
  tokens: {
    access_token: string;
    refresh_token: string;
  };
  user: any;
};
