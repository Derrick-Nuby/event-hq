import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const venues = await prisma.venue.findMany();
  return NextResponse.json({ success: true, data: venues });
}

export async function POST(request: Request) {
  const { name, address, capacity } = await request.json();
  const venue = await prisma.venue.create({ data: { name, address, capacity } });
  return NextResponse.json({ success: true, data: venue }, { status: 201 });
}