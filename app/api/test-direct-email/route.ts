import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST() {
  const notificationEmail = process.env.NOTIFICATION_EMAIL || 'jenny.bradshaw@gmail.com';
  const fromEmail = 'rbradshaw@gmail.com';

  console.log('Testing direct email to:', notificationEmail);
  console.log('From:', fromEmail);

  try {
    const msg = {
      to: notificationEmail,
      from: {
        email: fromEmail,
        name: 'Test Sender'
      },
      subject: 'Test Notification Email',
      text: 'This is a test notification email to verify delivery.',
      html: '<h1>Test Email</h1><p>This is a test notification email to verify delivery.</p>',
    };

    const result = await sgMail.send(msg);

    return NextResponse.json({
      success: true,
      message: 'Test email sent',
      statusCode: result[0].statusCode,
      messageId: result[0].headers['x-message-id'],
      to: notificationEmail,
      from: fromEmail,
    });
  } catch (error: any) {
    console.error('SendGrid error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        code: error.code,
        response: error.response?.body,
        to: notificationEmail,
        from: fromEmail,
      },
      { status: 500 }
    );
  }
}
