import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

async function sendBrevoEmail(toEmail: string) {
  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': process.env.BREVO_API_KEY || '',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      sender: {
        name: 'Founderscult',
        email: process.env.BREVO_SENDER_EMAIL || 'noreply@founderscult.in',
      },
      to: [{ email: toEmail }],
      subject: 'Welcome to the Cult! ✦',
      htmlContent: `
        <div style="font-family: 'Segoe UI', sans-serif; background-color: #050505; color: white; padding: 40px; border-radius: 16px; max-width: 600px; margin: 0 auto;">
          <h1 style="text-transform: uppercase; letter-spacing: -2px; font-weight: 900; font-size: 32px; color: #00ff88; margin-bottom: 8px;">Founderscult</h1>
          <p style="font-size: 18px; color: #cccccc; margin-bottom: 16px;">Thank you for joining the cult.</p>
          <p style="font-size: 16px; color: #e0e0e0; line-height: 1.6;">
            We're excited to have you with us. You're now part of a community of high-agency builders who are shaping India's next wave of startups.
          </p>
          <hr style="border: 0; border-top: 1px solid #333; margin: 24px 0;" />
          <p style="font-size: 14px; color: #666;">Stay tuned for updates. Build before you're ready. ✦</p>
        </div>
      `,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Brevo Email Error:', errorData);
  }
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const newWaitlist = await prisma.waitlist.create({
      data: { email },
    });

    // Send welcome email via Brevo (don't fail the request if email fails)
    try {
      await sendBrevoEmail(email);
    } catch (mailError) {
      console.error('Mail Error:', mailError);
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
