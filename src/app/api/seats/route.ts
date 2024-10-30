// app/api/seats/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { SeatType, SeatStatus } from '@prisma/client';

export async function GET() {
  try {
    const seats = await prisma.seat.findMany({
      include: {
        event: true,
      }
    });
    return NextResponse.json({ success: true, data: seats });
  } catch (error) {
    console.error('Failed to fetch seats:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch seats',
      error
    }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Check if event exists
    const eventExists = await prisma.event.findUnique({
      where: { id: data.eventId }
    });

    if (!eventExists) {
      return NextResponse.json({
        success: false,
        message: 'Event not found'
      }, { status: 404 });
    }

    // Validate seat type
    if (data.type && !Object.values(SeatType).includes(data.type)) {
      return NextResponse.json({
        success: false,
        message: 'Invalid seat type'
      }, { status: 400 });
    }

    // Validate seat status
    if (data.status && !Object.values(SeatStatus).includes(data.status)) {
      return NextResponse.json({
        success: false,
        message: 'Invalid seat status'
      }, { status: 400 });
    }

    // Check if seat number already exists for this event
    const existingSeat = await prisma.seat.findFirst({
      where: {
        number: data.number,
        eventId: data.eventId
      }
    });

    if (existingSeat) {
      return NextResponse.json({
        success: false,
        message: 'Seat number already exists for this event'
      }, { status: 400 });
    }

    const seat = await prisma.seat.create({
      data: {
        number: data.number,
        type: data.type || 'REGULAR',
        price: data.price,
        eventId: data.eventId,
        status: data.status || 'AVAILABLE'
      },
      include: {
        event: true
      }
    });

    return NextResponse.json({ success: true, data: seat }, { status: 201 });
  } catch (error) {
    console.error('Failed to create seat:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to create seat',
      error
    }, { status: 500 });
  }
}