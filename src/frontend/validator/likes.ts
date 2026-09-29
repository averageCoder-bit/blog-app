import { z } from "zod";

export const likeResponseSchema = z.object({
  liked: z.boolean(),
  like_count: z.number(),
});

export type LikeResponse = z.infer<typeof likeResponseSchema>;
