import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type Params = Promise<{ id: string; }>;

export async function GET(
  request: NextRequest,
  { params }: { params: Params; }
) {
  const resolvedParams = await params;
  const category = await prisma.category.findUnique({
    where: { id: resolvedParams.id }
  });

  if (!category) {
    return NextResponse.json(
      { success: false, message: 'Category not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, data: category });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Params; }
) {
  const resolvedParams = await params;
  const { name, description } = await request.json();

  const updatedCategory = await prisma.category.update({
    where: { id: resolvedParams.id },
    data: { name, description },
  });

  return NextResponse.json({ success: true, data: updatedCategory });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params; }
) {
  try {
    const resolvedParams = await params;
    await prisma.category.delete({
      where: { id: resolvedParams.id }
    });

    return NextResponse.json({ success: true, message: 'Category deleted' });
  } catch (error) {
    console.error('Failed', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error',
        error
      },
      { status: 500 }
    );
  }
}