import { z } from 'zod';

// Booking Schema
export const bookingSchema = z.object({
  userId: z.string(),
  eventId: z.string(),
  seatId: z.string(),
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED']).default('PENDING'),
});

export type BookingForm = z.infer<typeof bookingSchema>;
