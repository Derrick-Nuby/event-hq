import { z } from 'zod';

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  venueId: string;
  categoryId: string;
  price: number;
  status: 'DRAFT' | 'PUBLISHED' | 'CANCELLED' | 'COMPLETED';
}

// Event Schema
export const eventSchema = z.object({
  title: z.string().min(4, 'Title must be at least 4 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  startDate: z.string().transform((str) => new Date(str)),
  endDate: z.string().transform((str) => new Date(str)),
  userId: z.string().min(25, 'Invalid user ID format'),
  venueId: z.string().min(25, 'Invalid venue ID format'),
  categoryId: z.string().min(25, 'Invalid category ID format'),
  price: z
    .string()
    .refine((value) => !isNaN(parseFloat(value)) && parseFloat(value) > 0, {
      message: "Price must be a positive number",
    })
    .transform((value) => parseFloat(value)),
  image: z.string().url('Invalid image URL'),
  status: z.enum(['DRAFT', 'PUBLISHED', 'CANCELLED', 'COMPLETED']).default('DRAFT'),
});


export type EventFormData = z.infer<typeof eventSchema>;
