import { z } from "zod";

export const commentCreateSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "Comment cannot be empty.")
    .max(500, "Comment must be 500 characters or fewer."),
});

export const commentSchema = z.object({
  id: z.number(),
  content: z.string(),
  author_id: z.number(),
  blog_id: z.number(),
  created_at: z.string(),
});

export type CommentCreate = z.infer<typeof commentCreateSchema>;
export type Comment = z.infer<typeof commentSchema>;
