import { Resend } from 'resend';
import { contactSchema } from '@/lib/validations/contact';
import { NextResponse } from 'next/server';



export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ 
        success: false, 
        error: result.error.issues[0].message 
      }, { status: 400 });
    }

    const { name, email, message } = result.data;

    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL;
    if (!receiverEmail) {
      return NextResponse.json({
        success: false,
        error: 'ระบบยังไม่ได้ระบุอีเมลผู้รับปลายทาง (CONTACT_RECEIVER_EMAIL)'
      }, { status: 500 });
    }

    const apiKey = process.env.RESEND_API_KEY || process.env.SMTP_PASS;
    if (!apiKey) {
      return NextResponse.json({
        success: false,
        error: 'ระบบยังไม่ได้ระบุ API Key สำหรับส่งอีเมล (RESEND_API_KEY)'
      }, { status: 500 });
    }

    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: receiverEmail,
      subject: `New contact message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    console.error('[CONTACT_ERROR]', error);
    return NextResponse.json({ 
      success: false, 
      error: 'เกิดข้อผิดพลาดในการส่งข้อความ กรุณาลองใหม่อีกครั้ง' 
    }, { status: 500 });
  }
}
