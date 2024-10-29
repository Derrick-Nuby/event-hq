// app/api/events/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const events = await prisma.event.findMany({
    include: {
      venue: true,
      category: true,
      seats: true,
    }
  });
  return NextResponse.json({ success: true, data: events });
}

export async function POST(req: Request) {
  const data = await req.json();
  const event = await prisma.event.create({
    data: {
      title: data.title,
      description: data.description,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      price: data.price,
      userId: data.userId,
      venueId: data.venueId,
      categoryId: data.categoryId,
      status: data.status || 'DRAFT'
    }
  });
  return NextResponse.json({ success: true, data: event }, { status: 201 });
}