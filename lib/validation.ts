import { z } from "zod";

export const productSchema = z.object({
  name: z.string().trim().min(2).max(120),
  description: z.string().trim().min(2).max(2000),
  price: z.coerce.number().positive().max(10_000_000),
  category: z.string().trim().min(2).max(60),
  image: z.string().trim().min(1),
  featured: z.coerce.boolean().default(false),
  inStock: z.coerce.boolean().default(true),
});

export const loginSchema = z.object({
  username: z.string().trim().min(1).max(100),
  password: z.string().min(1).max(200),
});
