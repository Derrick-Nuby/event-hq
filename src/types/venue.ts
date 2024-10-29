import { z } from 'zod';

// Venue Schema
export const venueSchema = z.object({
  name: z.string().min(2, 'Venue name must be at least 2 characters'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  capacity: z.number().int().positive('Capacity must be a positive number'),
});

export type VenueForm = z.infer<typeof venueSchema>;
