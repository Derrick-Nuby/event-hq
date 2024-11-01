'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import EventCard from '@/components/EventCard';
import { useQuery } from '@tanstack/react-query';
import { getAllEvents } from '@/lib/events';

export default function Component() {
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 9;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDate, setSelectedDate] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');

  const {
    data: eventsData = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['events', searchQuery, selectedCategory, selectedDate, selectedPrice],
    queryFn: getAllEvents
  });

  const filteredEvents = eventsData.filter((event: { title: string; category: string; }) => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesDate = selectedDate === 'all';
    const matchesPrice = selectedPrice === 'all' || selectedPrice === 'allPaid';

    return matchesSearch && matchesCategory && matchesDate && matchesPrice;
  });

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-red-500">Error loading events: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Upcoming Events</h1>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Input
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="music">Music</SelectItem>
            <SelectItem value="technology">Technology</SelectItem>
            <SelectItem value="food">Food</SelectItem>
            <SelectItem value="art">Art</SelectItem>
            <SelectItem value="sports">Sports</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedDate} onValueChange={setSelectedDate}>
          <SelectTrigger>
            <SelectValue placeholder="Date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Dates</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="this-week">This Week</SelectItem>
            <SelectItem value="this-month">This Month</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedPrice} onValueChange={setSelectedPrice}>
          <SelectTrigger>
            <SelectValue placeholder="Price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="free">Free</SelectItem>
            <SelectItem value="allPaid">Paid</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {isLoading ? (
          [...Array(6)].map((_, index) => (
            <EventCard key={index} eventDetails={null} isLoading={true} />
          ))
        ) : (
          currentEvents.map((event: { id: string; image: string; title: string; startDate: string; venue: { name: string; }; seatsLeft: 100; price: string; } | null | undefined) => (
            <EventCard key={event?.id} eventDetails={event} isLoading={isLoading} />
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center space-x-2">
        {Array.from({ length: Math.ceil(filteredEvents.length / eventsPerPage) }).map((_, index) => (
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
