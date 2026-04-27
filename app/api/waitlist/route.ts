import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const newWaitlist = await prisma.waitlist.create({
      data: { email },
    });

    // Send Greeting Email
    try {
      await transporter.sendMail({
        from: `"Founderscult" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: "Welcome to the Cult! ✦",
        html: `
          <div style="font-family: sans-serif; background-color: #050505; color: white; padding: 40px; border-radius: 10px;">
            <h1 style="text-transform: uppercase; letter-spacing: -2px; font-weight: 900; color: #00ff88;">Founderscult</h1>
            <p style="font-size: 18px; color: #cccccc;">Thank you for joining the cult.</p>
            <p style="font-size: 16px;">We're excited to have you with us. India's next startups begin here.</p>
            <hr style="border: 0; border-top: 1px solid #333; margin: 20px 0;" />
            <p style="font-size: 14px; color: #666;">Stay tuned for updates. Build before you're ready.</p>
          </div>
        `,
      });
    } catch (mailError) {
      console.error("Mail Error:", mailError);
      // We don't want to fail the whole request if the mail fails
    }

    return NextResponse.json({ success: true, data: newWaitlist }, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') {
      // Unique constraint failed
      return NextResponse.json({ error: 'Email already on the waitlist' }, { status: 409 });
    }
    console.error("Waitlist Error:", error.message || error);
    return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
  }
}
