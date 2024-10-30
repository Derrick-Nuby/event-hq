import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string; }; }) {
  const venue = await prisma.venue.findUnique({ where: { id: params.id } });
  if (!venue) {
    return NextResponse.json({ success: false, message: 'Venue not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: venue });
}

export async function PUT(request: Request, { params }: { params: { id: string; }; }) {
  const { name, address, capacity } = await request.json();
  const updatedVenue = await prisma.venue.update({
    where: { id: params.id },
    data: { name, address, capacity },
  });
  return NextResponse.json({ success: true, data: updatedVenue });
}

export async function DELETE(request: Request, { params }: { params: { id: string; }; }) {
  await prisma.venue.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true, message: 'Venue deleted' });
}