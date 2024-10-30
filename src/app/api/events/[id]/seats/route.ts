import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string; }; }
) {
  const seats = await prisma.seat.findMany({
    where: {
      eventId: params.id,
    },
    orderBy: {
      number: 'asc'
    },
  });
  return NextResponse.json({ success: true, data: seats });
}