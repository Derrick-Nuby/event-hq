// app/api/categories/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const categories = await prisma.category.findMany();
  return NextResponse.json({ success: true, data: categories });
}

export async function POST(req: Request) {
  const data = await req.json();
  const category = await prisma.category.create({
    data: {
      name: data.name,
      description: data.description
    }
  });
  return NextResponse.json({ success: true, data: category }, { status: 201 });
}