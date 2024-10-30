import { z } from "zod";

export const loginUserDto = z.object({
    username: z.string(),
    password: z.string()
})

