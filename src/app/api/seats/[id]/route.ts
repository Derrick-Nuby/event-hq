// app/api/seats/[id]/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { SeatType, SeatStatus } from '@prisma/client';

type RouteParams = Promise<{ id: string; }>;

// Get single seat
export async function GET(req: Request, { params }: { params: RouteParams; }) {
  try {
    const resolvedParams = await params;
    const seat = await prisma.seat.findUnique({
      where: {
        id: resolvedParams.id,
      },
      include: {
        event: true,
        bookings: true,
      },
    });

    if (!seat) {
      return NextResponse.json(
        {
          success: false,
          message: 'Seat not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: seat });
  } catch (error) {
    console.error('Failed to fetch seat:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch seat',
        error,
      },
      { status: 500 }
    );
  }
}

// Update seat
export async function PATCH(req: Request, { params }: { params: RouteParams; }) {
  try {
    const resolvedParams = await params;
    const data = await req.json();

    // Check if seat exists
    const existingSeat = await prisma.seat.findUnique({
      where: { id: resolvedParams.id },
    });

    if (!existingSeat) {
      return NextResponse.json(
        {
          success: false,
          message: 'Seat not found',
        },
        { status: 404 }
      );
    }

    // If eventId is being updated, check if new event exists
    if (data.eventId) {
      const eventExists = await prisma.event.findUnique({
        where: { id: data.eventId },
      });

      if (!eventExists) {
        return NextResponse.json(
          {
            success: false,
            message: 'Event not found',
          },
          { status: 404 }
        );
      }
    }

    // Validate seat type
    if (data.type && !Object.values(SeatType).includes(data.type)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid seat type',
        },
        { status: 400 }
      );
    }

    // Validate seat status
    if (data.status && !Object.values(SeatStatus).includes(data.status)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid seat status',
        },
        { status: 400 }
      );
    }

    const updatedSeat = await prisma.seat.update({
      where: {
        id: resolvedParams.id,
      },
      data: {
        number: data.number,
        type: data.type,
        price: data.price,
        eventId: data.eventId,
        status: data.status,
      },
      include: {
        event: true,
      },
    });

    return NextResponse.json({ success: true, data: updatedSeat });
  } catch (error) {
    console.error('Failed to update seat:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update seat',
        error,
      },
      { status: 500 }
    );
  }
}

// Delete seat
export async function DELETE(req: Request, { params }: { params: RouteParams; }) {
  try {
    const resolvedParams = await params;

    // Check if seat exists
    const existingSeat = await prisma.seat.findUnique({
      where: { id: resolvedParams.id },
    });

    if (!existingSeat) {
      return NextResponse.json(
        {
          success: false,
          message: 'Seat not found',
        },
        { status: 404 }
      );
    }

    // Check if seat has any bookings
    const existingBooking = await prisma.booking.findFirst({
      where: { seatId: resolvedParams.id },
    });

    if (existingBooking) {
      return NextResponse.json(
        {
          success: false,
          message: 'Cannot delete seat with existing booking',
        },
        { status: 400 }
      );
    }

    await prisma.seat.delete({
      where: {
        id: resolvedParams.id,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Seat deleted successfully',
    });
  } catch (error) {
    console.error('Failed to delete seat:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete seat',
        error,
      },
      { status: 500 }
    );
  }
}
