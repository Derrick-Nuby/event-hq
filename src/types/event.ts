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
  venueId: z.string(),
  categoryId: z.string(),
  price: z.number().positive('Price must be positive'),
  status: z.enum(['DRAFT', 'PUBLISHED', 'CANCELLED', 'COMPLETED']).default('DRAFT'),
});

export type EventForm = z.infer<typeof eventSchema>;
