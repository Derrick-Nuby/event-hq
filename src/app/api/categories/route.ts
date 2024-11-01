import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const categories = await prisma.category.findMany();
  return NextResponse.json({ success: true, data: categories });
}

export async function POST(request: Request) {
  const { name, description } = await request.json();
  const category = await prisma.category.create({ data: { name, description } });
  return NextResponse.json({ success: true, data: category }, { status: 201 });
}