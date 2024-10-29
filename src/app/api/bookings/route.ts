// app/api/bookings/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const bookings = await prisma.booking.findMany({
    include: {
      user: true,
      event: true,
      seat: true,
    }
  });
  return NextResponse.json({ success: true, data: bookings });
}

export async function POST(req: Request) {
  const data = await req.json();
  const booking = await prisma.booking.create({
    data: {
      userId: data.userId,
      eventId: data.eventId,
      seatId: data.seatId,
      status: data.status || 'PENDING'
    }
  });
  return NextResponse.json({ success: true, data: booking }, { status: 201 });
}