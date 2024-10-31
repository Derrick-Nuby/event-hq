import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import BookingForm from './BookingForm';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
  eventDetails: EventDetails | null;
}

interface EventDetails {
  id: string;
  title: string;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, eventDetails }) => {

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Book Event: {eventDetails?.title}</DialogTitle>
        </DialogHeader>
        <BookingForm />
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button >Book Now</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};


export default BookingModal;