'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectGroup, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useUser } from '@/context/UserContext';
import { Event as PrismaEvent, Seat, BookingStatus } from '@prisma/client';
import { getEventSeats } from '@/lib/bookings';
import { useQuery } from '@tanstack/react-query';
import { createBooking } from '@/lib/bookings';

interface BookingFormData {
  seatId: string;
  status: BookingStatus;
}

interface BookingFormProps {
  eventDetails: PrismaEvent | null;
}

const BookingForm: React.FC<BookingFormProps> = ({ eventDetails }) => {
  const { user } = useUser();
  const [selectedSeat, setSelectedSeat] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<BookingStatus>('PENDING');

  const { handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm<BookingFormData>({
    defaultValues: {
      status: 'PENDING',
    }
  });

  const {
    data: availableSeats,
    isLoading,
    error
  } = useQuery({
    queryKey: ['availableSeats', eventDetails?.id],
    queryFn: () => getEventSeats(eventDetails?.id || ''),
    enabled: !!eventDetails?.id
  });

  const onSubmit = async (data: BookingFormData) => {
    if (!user?.id || !eventDetails?.id) {
      toast.error('User or event information is missing');
      return;
    }

    const bookingData = {
      ...data,
      userId: user.id,
      eventId: eventDetails.id,
    };

    try {
      await createBooking(bookingData);
      toast.success('Booking submitted successfully!');
      // Reset form
      setSelectedSeat('');
      setSelectedStatus('PENDING');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Failed to submit booking.');
    }
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-red-500">Error loading seats: {error instanceof Error ? error.message : 'Unknown error occurred'}</div>
      </div>
    );
  }

  const handleSeatChange = (value: string) => {
    setSelectedSeat(value);
    setValue('seatId', value);
  };

  const handleStatusChange = (value: string) => {
    const status = value as BookingStatus;
    setSelectedStatus(status);
    setValue('status', status);
  };

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
                <Select
                  value={selectedSeat || undefined}
                  onValueChange={handleSeatChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a seat" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {isLoading ? (
                        <SelectItem value="loading">Loading seats...</SelectItem>
                      ) : availableSeats && availableSeats.length > 0 ? (
                        availableSeats.map((seat: Seat) => (
                          <SelectItem key={seat.id} value={seat.id}>
                            {seat.number} - {seat.status}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no-seats">No seats available</SelectItem>
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
                <Select
                  value={selectedStatus || 'PENDING'}
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                      <SelectItem value="CANCELLED">Cancelled</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.status && (
                  <p className="text-sm text-red-500">{errors.status.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting || !selectedSeat}
              >
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
