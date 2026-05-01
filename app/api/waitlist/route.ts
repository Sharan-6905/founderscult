import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

async function sendBrevoEmail(toEmail: string) {
  try {
    console.log("📨 Sending email to:", toEmail);

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': process.env.BREVO_API_KEY as string,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: 'Founderscult',
          email: process.env.BREVO_SENDER_EMAIL as string, // MUST match verified sender
        },
        to: [{ email: toEmail }],
        subject: 'Welcome to the Cult! ✦',
        htmlContent: `
          <div style="font-family: 'Segoe UI', sans-serif; background-color: #050505; color: white; padding: 40px; border-radius: 16px; max-width: 600px; margin: 0 auto;">
            <h1 style="text-transform: uppercase; letter-spacing: -2px; font-weight: 900; font-size: 32px; color: #00ff88; margin-bottom: 8px;">Founderscult</h1>
            <p style="font-size: 18px; color: #cccccc; margin-bottom: 16px;">Thank you for joining the cult.</p>
            <p style="font-size: 16px; color: #e0e0e0; line-height: 1.6;">
              You're now part of a community of high-agency builders shaping India's next wave of startups.
            </p>
            <hr style="border: 0; border-top: 1px solid #333; margin: 24px 0;" />
            <p style="font-size: 14px; color: #666;">Build before you're ready. ✦</p>
          </div>
        `,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Brevo Error:', data);
      return false;
    }

    console.log('✅ Email sent successfully:', data);
    return true;

  } catch (error) {
    console.error('❌ Fetch Error:', error);
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 });
    }

    const newWaitlist = await prisma.waitlist.create({
      data: { email },
    });

    // Send email
    await sendBrevoEmail(email); 

    return NextResponse.json({ success: true, data: newWaitlist }, { status: 201 });

  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Email already on the waitlist' }, { status: 409 });
    }

    console.error("❌ Waitlist Error:", error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}