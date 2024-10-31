'use client';

import EventCard from '@/components/EventCard';
import { getAllEvents } from '@/lib/events';
import React from 'react';
import { useQuery } from '@tanstack/react-query';

export default function EventsPage() {
  const {
    data: eventsData,
    isLoading,
    error
  } = useQuery({
    queryKey: ['events'],
    queryFn: getAllEvents
  });

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-red-500">Error loading events: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">New Events</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {isLoading ? (
          [...Array(6)].map((_, index) => (
            <EventCard key={index} eventDetails={null} isLoading={true} />
          ))
        ) : (
          eventsData?.map((event: { id: string; image: string; title: string; startDate: string; venue: { name: string; }; seatsLeft: 100; price: string; } | null | undefined) => (
            <EventCard
              key={event?.id || event?.title}
              eventDetails={event}
              isLoading={false}
            />
          ))
        )}
      </div>
    </div>
  );
}