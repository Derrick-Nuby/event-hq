import { z } from 'zod';

// Category Schema
export const categorySchema = z.object({
  name: z.string().min(2, 'Category name must be at least 2 characters'),
  description: z.string().optional(),
});

export type CategoryForm = z.infer<typeof categorySchema>;
