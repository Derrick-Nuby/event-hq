import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { BookingStatus, Prisma } from '@prisma/client';

type Params = Promise<{ id: string; }>;

export async function GET(
  request: NextRequest,
  { params }: { params: Params; }
) {
  const resolvedParams = await params;
  const booking = await prisma.booking.findUnique({
    where: { id: resolvedParams.id },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
  });

  if (!booking) {
    return NextResponse.json(
      { success: false, message: 'Booking not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, data: booking });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Params; }
) {
  try {
    const resolvedParams = await params;
    const { status, seatId } = await request.json();

    const booking = await prisma.booking.findUnique({
      where: { id: resolvedParams.id },
      include: {},
    });

    if (!booking) {
      return NextResponse.json(
        { success: false, message: 'Booking not found' },
        { status: 404 }
      );
    }

    const updatedData: Prisma.BookingUpdateInput = {};

    if (status !== undefined) {
      if (!Object.values(BookingStatus).includes(status as BookingStatus)) {
        return NextResponse.json(
          { success: false, message: 'Invalid booking status' },
          { status: 400 }
        );
      }
      updatedData.status = status as BookingStatus;
    }

    if (seatId !== undefined && seatId !== booking.seatId) {
      const newSeat = await prisma.seat.findUnique({
        where: { id: seatId },
      });

      if (!newSeat || newSeat.status !== 'AVAILABLE') {
        return NextResponse.json(
          { success: false, message: 'New seat is not available' },
          { status: 400 }
        );
      }

      updatedData.seat = {
        connect: { id: seatId }
      };
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: resolvedParams.id },
      data: updatedData,
      include: {
        event: true,
        seat: true,
        user: true,
      },
    });

    return NextResponse.json({ success: true, data: updatedBooking });
  } catch (error) {
    console.error('Failed to update booking:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update booking', error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params; }
) {
  const resolvedParams = await params;
  await prisma.booking.delete({
    where: { id: resolvedParams.id },
  });

  return NextResponse.json({ success: true, message: 'Booking deleted' });
}