import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type Params = Promise<{ id: string; }>;

// Get event details
export async function GET(request: NextRequest, { params }: { params: Params; }) {
  const resolvedParams = await params;
  const event = await prisma.event.findUnique({
    where: { id: resolvedParams.id },
    include: {
      venue: {
        select: {
          id: true,
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

// Delete an event
export async function DELETE(request: NextRequest, { params }: { params: Params; }) {
  const resolvedParams = await params;
  await prisma.event.delete({
    where: { id: resolvedParams.id },
  });

  return NextResponse.json({ success: true, message: 'Event deleted' });
}
