// app/api/seats/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const seats = await prisma.seat.findMany({
    include: {
      event: true,
    }
  });
  return NextResponse.json({ success: true, data: seats });
}

export async function POST(req: Request) {
  const data = await req.json();
  const seat = await prisma.seat.create({
    data: {
      number: data.number,
      type: data.type || 'REGULAR',
      price: data.price,
      eventId: data.eventId,
      status: data.status || 'AVAILABLE'
    }
  });
  return NextResponse.json({ success: true, data: seat }, { status: 201 });
}