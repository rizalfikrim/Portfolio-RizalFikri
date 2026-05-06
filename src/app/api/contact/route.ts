import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Portfolio Contact Form <onboarding@resend.dev>',
        to: process.env.CONTACT_EMAIL,
        reply_to: email,
        subject: `[Portfolio] ${subject || 'New Message'} - from ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
            <h2 style="color: #333;">New Contact Message</h2>
            <p>You received a new message from your portfolio contact form.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject || 'No Subject'}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; white-space: pre-wrap;">${message}</div>
          </div>
        `,
      }),
    });

    if (res.ok) {
      return NextResponse.json({ success: true });
    } else {
      const errorData = await res.json();
      console.error('Resend API Error:', errorData);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
