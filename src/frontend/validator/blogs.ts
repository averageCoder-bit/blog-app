import { z } from "zod";

const containsOnlyEnglishLetters = (value: string) => {
  for (const char of value) {
    if (/\p{L}/u.test(char) && !/[A-Za-z]/.test(char)) {
      return false;
    }
  }

  return true;
};

export const BlogCreateSchema = z.object({
  header: z
    .string()
    .min(1, "Header is required")
    .max(150, "Header must be 150 characters or less")
    .refine(containsOnlyEnglishLetters, "Only English letters are allowed."),

  content: z
    .string()
    .min(1, "Content is required")
    .refine(
      (value) => value.trim().split(/\s+/).filter(Boolean).length <= 5000,
      "Content must be 5000 words or less",
    )
    .refine(containsOnlyEnglishLetters, "Only English letters are allowed."),

  excerpt: z
    .string()
    .max(300, "Excerpt must be 300 characters or less")
    .refine(containsOnlyEnglishLetters, "Only English letters are allowed."),

  image: z
    .instanceof(File)
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Only JPG, PNG, and WEBP images are allowed",
    )
    .refine((file) => file.size <= 5 * 1024 * 1024, "Image must be 5MB or less")
    .optional(),

  category: z
    .string()
    .min(1, "Category is required")
    .max(50, "Category must be 50 characters or less"),
});

export const BlogResponseSchema = z.object({
  id: z.number().int(),
  header: z.string(),
  content: z.string(),
  excerpt: z.string().nullable(),
  category: z.string(),
  author_id: z.number().int(),
  author_username: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  image_url: z.string().nullable(),
  like_count: z.number(),
  comment_count: z.number(),
  liked: z.boolean(),
});

export type BlogResponse = z.infer<typeof BlogResponseSchema>;
export type BlogCreate = z.infer<typeof BlogCreateSchema>;
