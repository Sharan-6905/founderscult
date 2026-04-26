import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const newWaitlist = await prisma.waitlist.create({
      data: { email },
    });

    return NextResponse.json({ success: true, data: newWaitlist }, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') {
      // Unique constraint failed
      return NextResponse.json({ error: 'Email already on the waitlist' }, { status: 409 });
    }
    console.error("Waitlist Error:", error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
