import EventDetails from '@/components/EventDetails';
import React from 'react';

const event = {
  imageSrc: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDN8fHN1bW1lciUyMG1hc2l0JTIwZmVzdGl2YWwlMjBpbWFnZXxlbnwwfHx8fDE2NzM4NjA3MTg&ixlib=rb-4.0.3&q=80&w=1080',
  imageAlt: 'Summer Music Festival',
  title: 'Summer Music Festival 2023',
  dateRange: 'July 15-17, 2023',
  location: 'Central Park, New York',
  startTime: '2:00 PM',
  endTime: '11:00 PM',
  attendees: 20000,
  description: 'Join us for the most anticipated music event of the summer! The Summer Music Festival 2023 brings together top artists from around the world for three days of non-stop music, fun, and unforgettable memories.',
  highlights: [
    'Over 50 performances across 5 stages',
    'Genre-spanning lineup including rock, pop, hip-hop, and electronic music',
    'Food village featuring local and international cuisines',
    'Art installations and interactive experiences',
    'Eco-friendly initiatives and waste reduction programs'
  ],
  lineup: [
    'The Rockin\' Rebels',
    'Electro Dreamers',
    'Pop Princess',
    'Hip-Hop Heroes',
    'And many more to be announced!'
  ],
  tickets: [
    { type: 'General Admission', price: '$149.99' },
    { type: 'VIP Package', price: '$299.99' },
    { type: 'Single Day Pass', price: '$79.99' }
  ],
  genres: 'Rock, Pop, Hip-Hop, Electronic',
  ageRestriction: '18+ event'
};

export default function page() {
  return (
    <EventDetails eventDetails={event} />
  );
}
