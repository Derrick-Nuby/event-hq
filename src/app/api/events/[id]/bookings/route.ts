import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string; }; }
) {
  try {
    const bookings = await prisma.booking.findMany({
      where: {
        eventId: params.id
      },
      include: {
        // user: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const stats = {
      total: bookings.length,
      confirmed: bookings.filter(b => b.status === 'CONFIRMED').length,
      pending: bookings.filter(b => b.status === 'PENDING').length,
      cancelled: bookings.filter(b => b.status === 'CANCELLED').length,
      totalRevenue: bookings
        .filter(b => b.status === 'CONFIRMED')
      // .reduce((sum, b) => sum + Number(b.seat.price), 0)
    };

    return NextResponse.json({
      success: true,
      data: bookings,
      stats
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch bookings',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, {
      status: 500
    });
  }
}