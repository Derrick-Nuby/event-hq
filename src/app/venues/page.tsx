'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useQuery } from '@tanstack/react-query';
import VenueCard from '@/components/VenueCard';
import { getAllVenues } from '@/lib/venues';

export default function Component() {
  const [currentPage, setCurrentPage] = useState(1);
  const venuesPerPage = 9;

  const {
    data: venueData = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['venues'],
    queryFn: getAllVenues
  });

  const indexOfLastVenue = currentPage * venuesPerPage;
  const indexOfFirstVenue = indexOfLastVenue - venuesPerPage;
  const currentVenues = venueData.slice(indexOfFirstVenue, indexOfLastVenue);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-red-500">Error loading venues: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Venues</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {isLoading ? (
          [...Array(6)].map((_, index) => (
            <VenueCard key={index} venueDetails={null} isLoading={true} />
          ))
        ) : (
          currentVenues.map((venue: { id: string; name: string; address: string; capacity: number; image: string; } | null) => (
            <VenueCard key={venue?.id} venueDetails={venue} isLoading={isLoading} />
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center space-x-2">
        {Array.from({ length: Math.ceil(venueData.length / venuesPerPage) }).map((_, index) => (
          <Button
            key={index}
            onClick={() => paginate(index + 1)}
            variant={currentPage === index + 1 ? "default" : "outline"}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
}
