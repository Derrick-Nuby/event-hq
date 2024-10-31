import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPinIcon, Share2Icon } from 'lucide-react';

interface VenueDetailsProps {
  venue: {
    id: string;
    name: string;
    address: string;
    capacity: number;
    image: string;
    details: string; // Venue description
    location: string;
  };
}

const VenueDetails: React.FC<VenueDetailsProps> = ({ venue }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="relative">
            <Image
              src={venue.image}
              alt={venue.name}
              width={1000}
              height={500}
              className="w-full h-[400px] object-cover rounded-lg"
            />
            <Button size="sm" variant="secondary" className="absolute top-4 right-4 rounded-full">
              <Share2Icon className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
          <h1 className="text-3xl font-bold mt-6 mb-4">{venue.name}</h1>
          <div className="flex flex-wrap gap-4 mb-6">
            <Badge variant="secondary" className="flex items-center">
              <MapPinIcon className="h-4 w-4 mr-1" />
              {venue.location}
            </Badge>
            <Badge variant="secondary" className="flex items-center">
              <span className="font-semibold">Capacity: {venue.capacity.toLocaleString()}</span>
            </Badge>
          </div>
          <div className="prose max-w-none">
            <p>{venue.details}</p> {/* Placeholder for venue description */}
          </div>
        </div>
        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Venue Information</h2>
              <p>Address: {venue.address}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VenueDetails;
