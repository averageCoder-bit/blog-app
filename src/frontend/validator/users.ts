import { z } from "zod";

export const UserCreateSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(100, "Username must be 100 characters or less"),
});

export const UserResponseSchema = z.object({
  id: z.number().int(),
  username: z.string(),
});

export type UserCreate = z.infer<typeof UserCreateSchema>;
export type UserResponse = z.infer<typeof UserResponseSchema>;
