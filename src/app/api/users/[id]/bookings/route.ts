import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type RouteParams = Promise<{ id: string; }>;

export async function GET(request: Request, { params }: { params: RouteParams; }) {
  try {
    const resolvedParams = await params;
    const booking = await prisma.booking.findMany({
      where: { userId: resolvedParams.id },
      include: {
        event: true,
        seat: true,
      },
    });

    if (!booking) {
      return NextResponse.json(
        { success: false, message: 'Booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(booking);
  } catch (error) {
    console.error('Error fetching booking of this user:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching booking of this user:' },
      { status: 500 }
    );
  }
}