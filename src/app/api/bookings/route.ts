import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const bookings = await prisma.booking.findMany({
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
      // event: true,
      // seat: true,
    },
  });
  return NextResponse.json({ success: true, data: bookings });
}

export async function POST(request: Request) {
  const { userId, eventId, seatId, status = 'PENDING' } = await request.json();

  // Validate required fields
  if (!userId || !eventId || !seatId) {
    return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
  }

  // Validate user, event, and seat
  const [user, event, seat] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId } }),
    prisma.event.findUnique({ where: { id: eventId } }),
    prisma.seat.findUnique({ where: { id: seatId } }),
  ]);

  if (!user || !event || !seat) {
    return NextResponse.json({ success: false, message: 'Invalid user, event, or seat' }, { status: 400 });
  }

  // Check if seat is available
  if (seat.status !== 'AVAILABLE') {
    return NextResponse.json({ success: false, message: 'Seat is not available' }, { status: 400 });
  }

  const booking = await prisma.booking.create({
    data: {
      userId,
      eventId,
      seatId,
      status,
    },
  });

  return NextResponse.json({ success: true, data: booking }, { status: 201 });
}