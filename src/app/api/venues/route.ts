// app/api/venues/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const venues = await prisma.venue.findMany();
  return NextResponse.json({ success: true, data: venues });
}

export async function POST(req: Request) {
  const data = await req.json();
  const venue = await prisma.venue.create({
    data: {
      name: data.name,
      address: data.address,
      capacity: data.capacity
    }
  });
  return NextResponse.json({ success: true, data: venue }, { status: 201 });
}
