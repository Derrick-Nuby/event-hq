import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

type RouteParams = Promise<{ id: string; }>;


export async function PUT(request: Request, { params }: { params: RouteParams; }) {

  const resolvedParams = await params;

  const { name, email, password } = await request.json();
  const updateData: { name?: string; email?: string; password?: string; } = {};

  if (name !== undefined) {
    updateData.name = name;
  }

  if (email !== undefined) {
    updateData.email = email;
  }

  if (password !== undefined) {
    updateData.password = await bcrypt.hash(password, 10);
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: resolvedParams.id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: 'User profile updated',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json(
      { success: false, message: 'Error updating user profile' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request, { params }: { params: RouteParams; }) {
  try {
    const resolvedParams = await params;

    const user = await prisma.user.findUnique({
      where: { id: resolvedParams.id },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching user profile' },
      { status: 500 }
    );
  }
}