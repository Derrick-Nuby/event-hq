import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string; }; }) {
  const booking = await prisma.booking.findUnique({
    where: { id: params.id },
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

  if (!booking) {
    return NextResponse.json({ success: false, message: 'Booking not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: booking });
}

export async function PUT(request: Request, { params }: { params: { id: string; }; }) {
  const { status, seatId } = await request.json();

  const booking = await prisma.booking.findUnique({
    where: { id: params.id },
    include: {
      // event: true,
      // seat: true,
    },
  });

  if (!booking) {
    return NextResponse.json({ success: false, message: 'Booking not found' }, { status: 404 });
  }

  const updatedData: { status?: string; seatId?: string; } = {};

  // Update status if provided
  if (status !== undefined) {
    updatedData.status = status;
  }

  // Update seat if provided
  if (seatId !== undefined && seatId !== booking.seatId) {
    const newSeat = await prisma.seat.findUnique({
      where: { id: seatId },
    });

    if (!newSeat || newSeat.status !== 'AVAILABLE') {
      return NextResponse.json({ success: false, message: 'New seat is not available' }, { status: 400 });
    }

    updatedData.seatId = seatId;
  }

  const updatedBooking = await prisma.booking.update({
    where: { id: params.id },
    data: updatedData,
  });

  return NextResponse.json({ success: true, data: updatedBooking });
}

export async function DELETE(request: Request, { params }: { params: { id: string; }; }) {
  await prisma.booking.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ success: true, message: 'Booking deleted' });
}