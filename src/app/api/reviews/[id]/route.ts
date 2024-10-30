import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type Params = Promise<{ id: string; }>;

// Get review details
export async function GET(request: Request, { params }: { params: Params; }) {
  const resolvedParams = await params;
  const review = await prisma.review.findUnique({
    where: { id: resolvedParams.id },
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

// Update review
export async function PUT(request: Request, { params }: { params: Params; }) {
  const resolvedParams = await params;
  const { rating, comment } = await request.json();

  const updatedReview = await prisma.review.update({
    where: { id: resolvedParams.id },
    data: { rating, comment },
  });

  return NextResponse.json({ success: true, data: updatedReview });
}

// Delete review
export async function DELETE(request: Request, { params }: { params: Params; }) {
  const resolvedParams = await params;

  await prisma.review.delete({ where: { id: resolvedParams.id } });

  return NextResponse.json({ success: true, message: 'Review deleted' });
}
