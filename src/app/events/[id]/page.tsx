'use client';

import { useEffect, useState } from 'react';
import EventDetails from '@/components/EventDetails';
import BookingModal from '@/components/BookingModal';
import { getSingleEvent } from '@/lib/events';
import { useQuery } from '@tanstack/react-query';
import { useParams, useSearchParams, useRouter } from 'next/navigation';

export default function Page() {
  const params = useParams<{ id: string; }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const eventID = params.id;
  const showBooking = searchParams.get('booking') === 'true';

  const {
    data: eventData,
    isLoading,
    error
  } = useQuery({
    queryKey: ['event', eventID],
    queryFn: () => getSingleEvent(eventID as string),
    enabled: !!eventID,
  });

  // Handle modal visibility based on URL parameter
  useEffect(() => {
    setIsModalOpen(showBooking);
  }, [showBooking]);

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    // Remove the booking parameter from URL
    const newUrl = `/events/${eventID}`;
    router.push(newUrl);
  };

  // Handle booking button click
  const handleBookClick = () => {
    router.push(`/events/${eventID}?booking=true`);
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-red-500">Error loading event: {error.message}</div>
      </div>
    );
  }

  return (
    <div>
      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        eventId={eventID}
        eventDetails={eventData}
      />

      {/* Event Details */}
      {isLoading ? (
        [...Array(1)].map((_, index) => (
          <EventDetails
            key={index}
            eventDetails={null}
            isLoading={true}
            onBookClick={handleBookClick}
          />
        ))
      ) : (
        <EventDetails
          key={eventData?.id || eventData?.title}
          eventDetails={eventData}
          isLoading={false}
          onBookClick={handleBookClick}
        />
      )}
    </div>
  );
}