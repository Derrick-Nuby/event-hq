import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string; }; }) {
  const review = await prisma.review.findUnique({
    where: { id: params.id },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
      event: true,
    },
  });
  if (!review) {
    return NextResponse.json({ success: false, message: 'Review not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: review });
}

export async function PUT(request: Request, { params }: { params: { id: string; }; }) {
  const { rating, comment } = await request.json();
  const updatedReview = await prisma.review.update({
    where: { id: params.id },
    data: { rating, comment },
  });
  return NextResponse.json({ success: true, data: updatedReview });
}

export async function DELETE(request: Request, { params }: { params: { id: string; }; }) {
  await prisma.review.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true, message: 'Review deleted' });
}