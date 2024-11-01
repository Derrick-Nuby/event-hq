import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MapPinIcon, Clock, Users, Share2Icon } from 'lucide-react';

interface EventDetailsProps {
  eventDetails: {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    price: string;
    image: string;
    venue: {
      name: string;
    };
  } | null;
  isLoading: boolean;
  onBookClick: () => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({ eventDetails, isLoading, onBookClick }) => {
  if (isLoading) {
    // Skeleton Loading State
    return (
      <div className="container mx-auto px-4 py-8 animate-pulse">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="w-full h-[400px] bg-gray-300 rounded-lg" />
            <div className="h-8 bg-gray-300 rounded-md mt-6 mb-4 w-3/4" />
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="h-6 bg-gray-300 rounded-full w-32" />
              <div className="h-6 bg-gray-300 rounded-full w-32" />
              <div className="h-6 bg-gray-300 rounded-full w-48" />
            </div>
            <div className="h-32 bg-gray-300 rounded-md mt-4" />
          </div>
          <div>
            <Card>
              <CardContent className="p-6">
                <div className="h-8 bg-gray-300 rounded-md mb-4 w-1/2" />
                <div className="space-y-4">
                  <div className="h-6 bg-gray-300 rounded-md w-full" />
                  <div className="h-6 bg-gray-300 rounded-md w-full" />
                </div>
                <div className="h-10 bg-gray-300 rounded-md mt-6" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!eventDetails) {
    return <div>No event details available</div>;
  }

  const {
    title,
    description,
    startDate,
    endDate,
    price,
    image,
    venue,
  } = eventDetails;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="relative">
            <Image
              src={image}
              alt={title}
              width={1000}
              height={500}
              className="w-full h-[400px] object-cover rounded-lg"
            />
            <Button size="sm" variant="secondary" className="absolute top-4 right-4 rounded-full">
              <Share2Icon className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
          <h1 className="text-3xl font-bold mt-6 mb-4">{title}</h1>
          <div className="flex flex-wrap gap-4 mb-6">
            <Badge variant="secondary" className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-1" />
              {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
            </Badge>
            <Badge variant="secondary" className="flex items-center">
              <MapPinIcon className="h-4 w-4 mr-1" />
              {venue.name}
            </Badge>
            <Badge variant="secondary" className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              Starts at {new Date(startDate).toLocaleTimeString()}
            </Badge>
            <Badge variant="secondary" className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              100,000 seats
            </Badge>
          </div>
          <div className="prose max-w-none">
            <p>{description}</p>
          </div>
        </div>
        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Ticket Information</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Standard Ticket</span>
                  <span className="text-xl font-bold">{Number(price).toLocaleString()} RWF</span>
                </div>
              </div>
              <Button className="w-full mt-6" onClick={onBookClick}>Book Tickets</Button>
            </CardContent>
          </Card>
          <Card className="mt-6">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Event Details</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <div>
                    <p className="font-semibold">Start Time</p>
                    <p>{new Date(startDate).toLocaleTimeString()}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <div>
                    <p className="font-semibold">End Time</p>
                    <p>{new Date(endDate).toLocaleTimeString()}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
