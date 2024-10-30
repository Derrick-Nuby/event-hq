import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string; }; }) {
  const category = await prisma.category.findUnique({ where: { id: params.id } });
  if (!category) {
    return NextResponse.json({ success: false, message: 'Category not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: category });
}

export async function PUT(request: Request, { params }: { params: { id: string; }; }) {
  const { name, description } = await request.json();
  const updatedCategory = await prisma.category.update({
    where: { id: params.id },
    data: { name, description },
  });
  return NextResponse.json({ success: true, data: updatedCategory });
}

export async function DELETE(request: Request, { params }: { params: { id: string; }; }) {
  await prisma.category.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true, message: 'Category deleted' });
}