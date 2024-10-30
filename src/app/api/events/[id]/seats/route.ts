import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type Params = Promise<{ id: string; }>;

export async function GET(
  request: NextRequest,
  { params }: { params: Params; }
) {
  const resolvedParams = await params;

  const seats = await prisma.seat.findMany({
    where: {
      eventId: resolvedParams.id,
    },
    orderBy: {
      number: 'asc'
    },
  });

  return NextResponse.json({ success: true, data: seats });
}