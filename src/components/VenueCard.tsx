import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPinIcon, Share2Icon, Armchair } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

type VenueCardProps = {
  venueDetails: {
    id: string;
    name: string;
    address: string;
    capacity: number;
    image: string;
  };
  isLoading?: boolean;
};

const VenueCard: React.FC<VenueCardProps> = ({ venueDetails, isLoading = false }) => {
  if (isLoading) {
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
          src={venueDetails.image}
          alt={venueDetails.name}
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
            <Link href={`/venues/${venueDetails.id}`}>View Details</Link>
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2">{venueDetails.name}</h3>
        <div className="flex items-center text-sm text-muted-foreground mb-1">
          <MapPinIcon className="h-4 w-4 mr-1" />
          {venueDetails.address}
        </div>
        <div className="flex items-center text-sm text-muted-foreground mb-1">
          <Armchair className="h-4 w-4 mr-1" />
          {venueDetails.capacity} Capacity
        </div>
      </CardContent>
    </Card>
  );
};

export default VenueCard;
