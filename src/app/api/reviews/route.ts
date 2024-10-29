// app/api/reviews/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const reviews = await prisma.review.findMany({
    include: {
      user: true,
      event: true,
    }
  });
  return NextResponse.json({ success: true, data: reviews });
}

export async function POST(req: Request) {
  const data = await req.json();
  const review = await prisma.review.create({
    data: {
      rating: data.rating,
      comment: data.comment,
      userId: data.userId,
      eventId: data.eventId
    }
  });
  return NextResponse.json({ success: true, data: review }, { status: 201 });
}