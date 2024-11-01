import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CalendarIcon, MapPinIcon, Share2Icon, Armchair } from 'lucide-react';
import { Skeleton } from './ui/skeleton';
import { useRouter } from 'next/navigation';

type EventDetails = {
  id: string;
  image: string;
  title: string;
  startDate: string;
  venue: {
    name: string;
  };
  seatsLeft: 100;
  price: string;
};

type EventCardProps = {
  eventDetails?: EventDetails | null;
  isLoading?: boolean;
};

const EventCard: React.FC<EventCardProps> = ({ eventDetails, isLoading = false }) => {

  const router = useRouter();

  const handleBookClick = () => {
    router.push(`/events/${eventDetails?.id}?booking=true`);
  };
  if (isLoading || !eventDetails) {
    return (
      <Card className="w-full max-w-sm overflow-hidden">
        <Skeleton className="w-full h-48" />
        <CardContent className="p-4 space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-10 w-20" />
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-sm overflow-hidden">
      <div className="relative">
        <Image
          src={eventDetails.image}
          alt={`${eventDetails.title} image`}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 flex space-x-2">
          <Button size="sm" variant="secondary" className="rounded-full py-5">
            <Share2Icon className="h-4 w-4" />
            <span className="sr-only">Share</span>
          </Button>
        </div>
        <div className="absolute bottom-2 right-2">
          <Button asChild size="sm" variant="secondary">
            <Link href={`/events/${eventDetails.id}`}>View Details</Link>
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2">{eventDetails.title}</h3>
        <div className="flex items-center text-sm text-muted-foreground mb-1">
          <CalendarIcon className="h-4 w-4 mr-1" />
          {new Date(eventDetails.startDate).toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </div>
        <div className="flex items-center text-sm text-muted-foreground mb-1">
          <MapPinIcon className="h-4 w-4 mr-1" />
          {eventDetails.venue.name}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Armchair className="h-4 w-4 mr-1" />
          {eventDetails.seatsLeft} Seats Left
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="text-lg font-bold"><span className="text-sm font-light">RWF</span> {Number(eventDetails.price).toLocaleString()}</div>
        <Button asChild>
          <Link href={`/events/${eventDetails.id}?booking=true`} onClick={handleBookClick}>
            Book Now
          </Link>
        </Button>

      </CardFooter>
    </Card>
  );
};

export default EventCard;;