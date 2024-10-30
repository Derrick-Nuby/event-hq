import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const events = await prisma.event.findMany({
    where: { status: 'PUBLISHED' },
    include: {
      // venue: true,
      // category: true,
      // seats: true,
      createdBy: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
  });
  return NextResponse.json({ success: true, data: events });
}

export async function POST(request: Request) {
  const { title, description, startDate, endDate, price, userId, venueId, categoryId, status = 'DRAFT' } = await request.json();

  // Validate required fields
  if (!title || !description || !startDate || !endDate || !price || !userId || !venueId || !categoryId) {
    return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
  }

  // Validate dates
  if (new Date(startDate) >= new Date(endDate)) {
    return NextResponse.json({ success: false, message: 'Start date must be before end date' }, { status: 400 });
  }

  // Validate user, venue, and category
  const [user, venue, category] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId } }),
    prisma.venue.findUnique({ where: { id: venueId } }),
    prisma.category.findUnique({ where: { id: categoryId } }),
  ]);

  if (!user || !venue || !category) {
    return NextResponse.json({ success: false, message: 'Invalid user, venue, or category' }, { status: 400 });
  }

  const event = await prisma.event.create({
    data: {
      title,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      price,
      userId,
      venueId,
      categoryId,
      status,
    },
  });

  return NextResponse.json({ success: true, data: event }, { status: 201 });
}