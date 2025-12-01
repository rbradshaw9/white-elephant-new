import { NextRequest, NextResponse } from 'next/server';
import { sendRSVPConfirmation } from '@/lib/sendEmail';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate admin password
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('[TEST EMAIL] Starting test email send to:', email);
    console.log('[TEST EMAIL] Environment check:', {
      hasSendGridKey: !!process.env.SENDGRID_API_KEY,
      sendGridKeyLength: process.env.SENDGRID_API_KEY?.length,
      fromEmail: process.env.SENDGRID_FROM_EMAIL,
      fromName: process.env.SENDGRID_FROM_NAME,
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    });

    // Test email
    await sendRSVPConfirmation({
      to: email,
      primaryName: 'Test User',
      guestNames: ['Test User', 'Test Guest'],
      elfNames: ['Jolly Snowflake', 'Merry Gumdrop']
    });

    console.log('[TEST EMAIL] Email sent successfully');
    return NextResponse.json({ 
      success: true, 
      message: 'Test email sent! Check your inbox (and spam folder).',
      config: {
        fromEmail: process.env.SENDGRID_FROM_EMAIL,
        fromName: process.env.SENDGRID_FROM_NAME,
      }
    });
  } catch (error) {
    console.error('[TEST EMAIL] Error:', error);
    console.error('[TEST EMAIL] Error details:', {
      message: (error as Error).message,
      stack: (error as Error).stack,
      name: (error as Error).name,
    });

    // Check if it's a SendGrid error
    if ((error as any).response?.body?.errors) {
      console.error('[TEST EMAIL] SendGrid errors:', (error as any).response.body.errors);
    }

    return NextResponse.json({ 
      error: 'Email failed', 
      details: (error as Error).message,
      sendGridErrors: (error as any).response?.body?.errors
    }, { status: 500 });
  }
}
