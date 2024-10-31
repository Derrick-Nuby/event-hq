import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MapPinIcon, Clock, Users, Music, Share2Icon } from 'lucide-react';

interface EventDetailsProps {
  eventDetails: {
    imageSrc: string;
    imageAlt: string;
    title: string;
    dateRange: string;
    location: string;
    startTime: string;
    endTime: string;
    attendees: number;
    description: string;
    highlights: string[];
    lineup: string[];
    tickets: { type: string; price: string; }[];
    genres: string;
    ageRestriction: string;
  };
}

const EventDetails: React.FC<EventDetailsProps> = ({ eventDetails }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="relative">
            <Image
              src={eventDetails.imageSrc}
              alt={eventDetails.imageAlt}
              width={1000}
              height={500}
              className="w-full h-[400px] object-cover rounded-lg"
            />
            <Button size="sm" variant="secondary" className="absolute top-4 right-4 rounded-full">
              <Share2Icon className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
          <h1 className="text-3xl font-bold mt-6 mb-4">{eventDetails.title}</h1>
          <div className="flex flex-wrap gap-4 mb-6">
            <Badge variant="secondary" className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-1" />
              {eventDetails.dateRange}
            </Badge>
            <Badge variant="secondary" className="flex items-center">
              <MapPinIcon className="h-4 w-4 mr-1" />
              {eventDetails.location}
            </Badge>
            <Badge variant="secondary" className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              Gates open at {eventDetails.startTime}
            </Badge>
            <Badge variant="secondary" className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {eventDetails.attendees.toLocaleString()} attendees
            </Badge>
          </div>
          <div className="prose max-w-none">
            <p>{eventDetails.description}</p>
            <h2>Event Highlights</h2>
            <ul>
              {eventDetails.highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
            <h2>Lineup Sneak Peek</h2>
            <ul>
              {eventDetails.lineup.map((artist, index) => (
                <li key={index}>{artist}</li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Ticket Information</h2>
              <div className="space-y-4">
                {eventDetails.tickets.map((ticket, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="font-semibold">{ticket.type}</span>
                    <span className="text-xl font-bold">{ticket.price}</span>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-6">Book Tickets</Button>
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
                    <p>{eventDetails.startTime}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <div>
                    <p className="font-semibold">End Time</p>
                    <p>{eventDetails.endTime}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Music className="h-5 w-5 mr-2" />
                  <div>
                    <p className="font-semibold">Music Genres</p>
                    <p>{eventDetails.genres}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  <div>
                    <p className="font-semibold">Age Restriction</p>
                    <p>{eventDetails.ageRestriction}</p>
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
