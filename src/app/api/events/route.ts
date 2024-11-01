import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import uploadImage from '@/utils/fileUpload';
import { Prisma } from '@prisma/client';

export async function GET() {
  const events = await prisma.event.findMany({
    include: {
      venue: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return NextResponse.json({ success: true, data: events });
}

export async function POST(request: Request) {
  try {
    const { title, description, startDate, endDate, price, userId, venueId, categoryId, image, status = 'DRAFT' } = await request.json();

    // Validate required fields
    if (!title || !description || !startDate || !endDate || !price || !userId || !venueId || !categoryId || !image) {
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

    // Upload image and get URL
    const imageUrl = await uploadImage(image);

    // Create event with proper relation syntax
    const event = await prisma.event.create({
      data: {
        title,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        price: new Prisma.Decimal(price.toString()),
        image: imageUrl,
        status,
        createdBy: {
          connect: { id: userId }
        },
        venue: {
          connect: { id: venueId }
        },
        category: {
          connect: { id: categoryId }
        }
      },
    });

    return NextResponse.json({ success: true, data: event }, { status: 201 });
  } catch (error) {
    console.error('Event creation error:', error);
    return NextResponse.json({ success: false, message: 'Failed to create event' }, { status: 500 });
  }
}