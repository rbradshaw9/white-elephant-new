import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const supabase = getServiceSupabase();
    
    // Get email template
    const { data: emailData, error: emailError } = await supabase
      .from('settings')
      .select('*')
      .eq('id', 'email_template')
      .single();
    
    // Get event config
    const { data: eventData, error: eventError } = await supabase
      .from('settings')
      .select('*')
      .eq('id', 'event_config')
      .single();

    return NextResponse.json({
      emailTemplate: {
        exists: !!emailData,
        hasCalendarLink: emailData?.settings?.template?.includes('{{CALENDAR_LINK}}'),
        hasManageLink: emailData?.settings?.template?.includes('{{MANAGE_RSVP_LINK}}'),
        error: emailError?.message
      },
      eventConfig: {
        exists: !!eventData,
        partyDateTime: eventData?.settings?.partyDateTime,
        error: eventError?.message
      }
    });
  } catch (error) {
    console.error('Debug error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: (error as Error).message },
      { status: 500 }
    );
  }
}
