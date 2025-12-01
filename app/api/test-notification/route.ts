import { NextResponse } from 'next/server';
import { sendNotificationEmail } from '@/lib/sendEmail';

export async function POST() {
  try {
    console.log('[TEST] Starting notification email test');
    console.log('[TEST] SENDGRID_API_KEY exists:', !!process.env.SENDGRID_API_KEY);
    console.log('[TEST] SENDGRID_FROM_EMAIL:', process.env.SENDGRID_FROM_EMAIL);
    console.log('[TEST] NOTIFICATION_EMAIL:', process.env.NOTIFICATION_EMAIL || 'jenny.bradshaw@gmail.com (default)');

    await sendNotificationEmail({
      to: 'test@example.com',
      primaryName: 'Test User',
      guestNames: ['Test User', 'Guest 2'],
      elfNames: ['Jingle McTest', 'Sparkle TestElf'],
    });

    return NextResponse.json({
      success: true,
      message: 'Test notification sent!',
      fromEmail: process.env.SENDGRID_FROM_EMAIL,
      toEmail: process.env.NOTIFICATION_EMAIL || 'jenny.bradshaw@gmail.com',
    });
  } catch (error) {
    console.error('[TEST] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        fromEmail: process.env.SENDGRID_FROM_EMAIL,
        toEmail: process.env.NOTIFICATION_EMAIL || 'jenny.bradshaw@gmail.com',
      },
      { status: 500 }
    );
  }
}
