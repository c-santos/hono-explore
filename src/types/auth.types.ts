import { z } from "zod";
import { createUserDto } from "./users.dto";

export type registerUserDto = z.infer<typeof createUserDto>
