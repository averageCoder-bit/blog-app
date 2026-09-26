import { z } from "zod";

export const BlogCreateSchema = z.object({
  header: z
    .string()
    .min(1, "Header is required")
    .max(150, "Header must be 150 characters or less"),

  content: z.string().min(1, "Content is required"),

  excerpt: z.string().max(300, "Excerpt must be 300 characters or less"),

  category: z
    .string()
    .min(1, "Category is required")
    .max(50, "Category must be 50 characters or less"),

  author_id: z.number().int(),
});

export type BlogCreate = z.infer<typeof BlogCreateSchema>;
