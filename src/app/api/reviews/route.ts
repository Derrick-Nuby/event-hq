import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const reviews = await prisma.review.findMany({
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
      event: true,
    },
  });
  return NextResponse.json({ success: true, data: reviews });
}

export async function POST(request: Request) {
  const { rating, comment, userId, eventId } = await request.json();

  // Validate userId, and eventId
  const [user, event] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId } }),
    prisma.event.findUnique({ where: { id: eventId } }),
  ]);

  if (!user || !event) {
    return NextResponse.json({ success: false, message: 'Invalid user, or event' }, { status: 400 });
  }

  const review = await prisma.review.create({ data: { rating, comment, userId, eventId } });

  return NextResponse.json({ success: true, data: review }, { status: 201 });
}