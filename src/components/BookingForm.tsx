'use client';

import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectGroup } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { BookingFormData } from '@/types';
import { useUser } from '@/context/UserContext';
import { Event as PrismaEvent } from '@prisma/client';
import { getEventSeats } from '@/lib/bookings';
import { useQuery } from '@tanstack/react-query';
import { createBooking } from '@/lib/bookings';

interface BookingFormProps {
  eventDetails: PrismaEvent | null;
}

const BookingForm: React.FC<BookingFormProps> = ({ eventDetails }) => {
  const { user } = useUser();
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm<BookingFormData>();

  const {
    data: availableSeats,
    isLoading,
    error
  } = useQuery({
    queryKey: ['availableSeats', eventDetails?.id],
    queryFn: () => getEventSeats(eventDetails?.id || ''),
    enabled: !!eventDetails?.id // Fetch only if eventDetails is available
  });

  const onSubmit = async (data: BookingFormData) => {
    // Add userId and eventId to the booking data
    const bookingData = {
      ...data,
      userId: user?.id,               // Automatically include user ID
      eventId: eventDetails?.id,      // Automatically include event ID
    };

    try {
      await createBooking(bookingData);
      toast.success('Booking submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit booking.');
    }
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-red-500">Error loading events: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md p-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Book Your Seat</CardTitle>
            <CardDescription className="text-center">
              Fill out the details below to book your seat.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Seat Selection */}
              <div className="space-y-2">
                <Label htmlFor="seatId">Select Seat</Label>
                <Select onValueChange={(value) => setValue('seatId', value)}>
                  <SelectTrigger>
                    <span>Select Seat</span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {isLoading ? (
                        <SelectItem disabled>Loading seats...</SelectItem>
                      ) : (
                        availableSeats?.map(seat => (
                          <SelectItem key={seat.id} value={seat.id}>
                            {seat.number} - {seat.status}
                          </SelectItem>
                        ))
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.seatId && (
                  <p className="text-sm text-red-500">{errors.seatId.message}</p>
                )}
              </div>

              {/* Booking Status */}
              <div className="space-y-2">
                <Label htmlFor="status">Booking Status</Label>
                <Select onValueChange={(value) => setValue('status', value)}>
                  <SelectTrigger>
                    <span>Select Status</span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value='PENDING'>Pending</SelectItem>
                      <SelectItem value='CONFIRMED'>Confirmed</SelectItem>
                      <SelectItem value='CANCELLED'>Cancelled</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Booking...
                  </>
                ) : (
                  'Book Now'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingForm;
