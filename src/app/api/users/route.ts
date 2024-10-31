// app/api/users/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { createToken } from '@/utils/jwt';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching users' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  try {

    const userExists = await prisma.user.findUnique({ where: { email } });

    if (userExists) {
      return NextResponse.json({
        success: false,
        message: 'User already exists'
      }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      user: { id: user.id, name: user.name, email: user.email },
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({
      success: false,
      message: 'Error creating user'
    }, { status: 500 });
  }
}

export async function PUT(req: Request) {

  const { email, password } = await req.json();

  try {

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'User not found'
      }, { status: 404 });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json({
        success: false,
        message: 'Invalid password'
      }, { status: 401 });
    }

    const token = createToken({ userId: user.id, email: user.email, role: user.role });

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token
    });

  } catch (error) {
    console.error('Failed to fetch bookings:', error);
    return NextResponse.json({
      success: false,
      message: 'Error logging in'
    }, { status: 500 });
  }
}