import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Get event details
export async function GET(request: Request, { params }: { params: { id: string; }; }) {
  const event = await prisma.event.findUnique({
    where: { id: params.id },
    include: {
      // venue: true,
      // category: true,
      // seats: true,
      // bookings: {
      //   include: {
      //     user: true,
      //     seat: true,
      //   },
      // },
      // reviews: {
      //   include: {s
      //     user: true,
      //   },
      // },
      createdBy: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
  });

  if (!event) {
    return NextResponse.json({ success: false, message: 'Event not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: event });
}

export async function PUT(request: Request, { params }: { params: { id: string; }; }) {
  const { title, description, startDate, endDate, price, status, venueId, categoryId } = await request.json();

  const updatedData: {
    title?: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    price?: number;
    status?: string;
    venueId?: string;
    categoryId?: string;
  } = {};

  if (title !== undefined) {
    updatedData.title = title;
  }

  if (description !== undefined) {
    updatedData.description = description;
  }

  if (startDate !== undefined) {
    updatedData.startDate = new Date(startDate);
  }

  if (endDate !== undefined) {
    updatedData.endDate = new Date(endDate);
  }

  if (price !== undefined) {
    updatedData.price = price;
  }

  if (status !== undefined) {
    updatedData.status = status;
  }

  if (venueId !== undefined) {
    updatedData.venueId = venueId;
  }

  if (categoryId !== undefined) {
    updatedData.categoryId = categoryId;
  }

  // Validate dates
  if (updatedData.startDate && updatedData.endDate && updatedData.startDate >= updatedData.endDate) {
    return NextResponse.json({ success: false, message: 'Start date must be before end date' }, { status: 400 });
  }

  // Validate venue and category
  if ((updatedData.venueId || updatedData.categoryId) && (await validateVenueAndCategory(updatedData.venueId, updatedData.categoryId))) {
    return NextResponse.json({ success: false, message: 'Invalid venue or category' }, { status: 400 });
  }

  const updatedEvent = await prisma.event.update({
    where: { id: params.id },
    data: updatedData,
  });

  return NextResponse.json({ success: true, data: updatedEvent });
}

async function validateVenueAndCategory(venueId?: string, categoryId?: string) {
  const [venue, category] = await Promise.all([
    venueId ? prisma.venue.findUnique({ where: { id: venueId } }) : null,
    categoryId ? prisma.category.findUnique({ where: { id: categoryId } }) : null,
  ]);

  return !venue || !category;
}

// Delete an event
export async function DELETE(request: Request, { params }: { params: { id: string; }; }) {
  await prisma.event.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ success: true, message: 'Event deleted' });
}