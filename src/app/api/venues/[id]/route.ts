import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type RouteParams = Promise<{ id: string; }>;


export async function GET(request: Request, { params }: { params: RouteParams; }) {

  const resolvedParams = await params;

  const venue = await prisma.venue.findUnique({ where: { id: resolvedParams.id } });
  if (!venue) {
    return NextResponse.json({ success: false, message: 'Venue not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: venue });
}

export async function PUT(request: Request, { params }: { params: RouteParams; }) {

  const resolvedParams = await params;

  const { name, address, capacity } = await request.json();
  const updatedVenue = await prisma.venue.update({
    where: { id: resolvedParams.id },
    data: { name, address, capacity },
  });
  return NextResponse.json({ success: true, data: updatedVenue });
}

export async function DELETE(request: Request, { params }: { params: RouteParams; }) {

  const resolvedParams = await params;

  await prisma.venue.delete({ where: { id: resolvedParams.id } });
  return NextResponse.json({ success: true, message: 'Venue deleted' });
}