import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import uploadImage from '@/utils/fileUpload';

export async function GET() {
  const venues = await prisma.venue.findMany();
  return NextResponse.json({ success: true, data: venues });
}

export async function POST(request: Request) {
  try {
    const { name, address, capacity, image } = await request.json();

    // Validate required fields
    if (!name || !address || !capacity || !image) {
      return NextResponse.json({
        success: false,
        message: 'Missing required fields. Name, address, capacity, and image are required.'
      }, { status: 400 });
    }

    // Validate capacity
    if (capacity <= 0 || !Number.isInteger(capacity)) {
      return NextResponse.json({
        success: false,
        message: 'Capacity must be a positive integer'
      }, { status: 400 });
    }

    // Upload image and get URL
    const imageUrl = await uploadImage(image);

    // Create venue with image URL
    const venue = await prisma.venue.create({
      data: {
        name,
        address,
        capacity,
        image: imageUrl
      },
    });

    return NextResponse.json({ success: true, data: venue }, { status: 201 });
  } catch (error) {
    console.error('Venue creation error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to create venue'
    }, { status: 500 });
  }
}