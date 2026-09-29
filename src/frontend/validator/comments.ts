import { z } from "zod";

const containsOnlyEnglishLetters = (value: string) => {
  for (const char of value) {
    if (/\p{L}/u.test(char) && !/[A-Za-z]/.test(char)) {
      return false;
    }
  }

  return true;
};

export const commentCreateSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "Comment cannot be empty.")
    .max(500, "Comment must be 500 characters or fewer.")
    .refine(containsOnlyEnglishLetters, "Only English letters are allowed."),
});

export const commentSchema = z.object({
  id: z.number(),
  content: z.string(),
  author_id: z.number(),
  author_username: z.string(),
  blog_id: z.number(),
  created_at: z.string(),
});

export type CommentCreate = z.infer<typeof commentCreateSchema>;
export type Comment = z.infer<typeof commentSchema>;
