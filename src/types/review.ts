import { z } from 'zod';

// Review Schema
export const reviewSchema = z.object({
  rating: z.number().min(0).max(5),
  comment: z.string().optional(),
  userId: z.string(),
  eventId: z.string(),
});

export type ReviewForm = z.infer<typeof reviewSchema>;
