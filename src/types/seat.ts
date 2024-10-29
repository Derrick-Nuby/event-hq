import { z } from 'zod';


// Seat Schema
export const seatSchema = z.object({
  number: z.string(),
  type: z.enum(['VIP', 'REGULAR', 'ECONOMY']).default('REGULAR'),
  price: z.number().positive('Price must be positive'),
  eventId: z.string(),
});

export type SeatForm = z.infer<typeof seatSchema>;
