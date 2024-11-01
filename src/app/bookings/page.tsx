'use client';

import { useMemo } from 'react';
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef
} from 'mantine-react-table';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '@/context/UserContext';
import { getUserBookings } from '@/lib/users';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

// Define a type that matches your booking structure
interface Booking {
  id: string;
  userId: string;
  eventId: string;
  seatId: string;
  status: 'CONFIRMED' | 'PENDING' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
  event: {
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    price: string;
    image: string;
  };
  seat: {
    id: string;
    number: string;
    type: string;
    price: string;
  };
}

export default function UserBookingsTable() {
  const { user, isLoading: isUserLoading } = useUser();

  const {
    data: bookings = [],
    isLoading: isBookingsLoading,
    error,
    isError
  } = useQuery<Booking[], Error>({
    queryKey: ['userBookings', user?.id],
    queryFn: async () => {
      if (!user?.id) {
        throw new Error('User ID is required');
      }
      return getUserBookings(user.id);
    },
    enabled: Boolean(user?.id),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const columns = useMemo<MRT_ColumnDef<Booking>[]>(
    () => [
      {
        accessorKey: 'event.title',
        header: 'Event',
      },
      {
        accessorKey: 'event.startDate',
        header: 'Date',
        Cell: ({ cell }) => format(new Date(cell.getValue<string>()), 'PPp'),
      },
      {
        accessorKey: 'seat.number',
        header: 'Seat',
      },
      {
        accessorKey: 'seat.type',
        header: 'Seat Type',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        Cell: ({ cell }) => {
          const status = cell.getValue<string>();
          const statusVariants = {
            'CONFIRMED': 'default',
            'PENDING': 'outline',
            'CANCELLED': 'destructive'
          };
          return (
            <Badge
              variant={statusVariants[status] || 'default'}
            >
              {status}
            </Badge>
          );
        },
      },
      {
        accessorKey: 'event.price',
        header: 'Ticket Price',
        Cell: ({ cell }) => {
          const price = cell.getValue<string>();
          return new Intl.NumberFormat('en-RW', {
            style: 'currency',
            currency: 'RWF'
          }).format(parseFloat(price));
        },
      },
    ],
    [],
  );

  const table = useMantineReactTable({
    columns,
    data: bookings,
    state: {
      isLoading: isBookingsLoading,
    },
    mantineTableBodyCellProps: {
      style: {
        whiteSpace: 'normal',
      },
    },
    // Add these styling props
    mantineTableProps: {
      withColumnBorders: false,
      striped: false,
      highlightOnHover: true,
      style: {
        backgroundColor: 'hsl(var(--card))', // Background adapts to light/dark modes
        color: '#000000',      // Text color adjusts for readability
      },
    },
    mantineTableHeadCellProps: {
      style: {
        backgroundColor: '#222222',         // Muted background for headers
        color: 'hsl(var(--primary-foreground))',       // Primary foreground for text
        fontWeight: 'bold',                            // Keeps header text prominent
        borderBottom: '1px solid hsl(var(--border))',  // Border for a clean header-cell separation
      },
    },

  });

  // Handle initial user loading state
  if (isUserLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  // Handle case where user is not found/authenticated
  if (!user) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Please log in to view your bookings
        </AlertDescription>
      </Alert>
    );
  }

  // Handle query error state
  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          {error?.message || 'Failed to load bookings'}
        </AlertDescription>
      </Alert>
    );
  }

  // Handle empty bookings state
  if (bookings.length === 0) {
    return (
      <Alert>
        <AlertDescription>
          No bookings found
        </AlertDescription>
      </Alert>
    );
  }

  return <MantineReactTable table={table} />;
} 