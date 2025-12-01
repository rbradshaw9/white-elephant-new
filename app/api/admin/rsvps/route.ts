import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    // Verify password from header
    const password = request.headers.get('x-admin-password');
    const envPassword = process.env.ADMIN_PASSWORD;
    
    console.log('[API RSVPS] Password check:', {
      hasPassword: !!password,
      passwordLength: password?.length,
      hasEnvPassword: !!envPassword,
      envPasswordLength: envPassword?.length,
      match: password === envPassword
    });
    
    if (password !== envPassword) {
      console.error('[API RSVPS] Unauthorized - password mismatch');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('[API RSVPS] Authentication successful, fetching RSVPs');
    const supabase = getServiceSupabase();
    const { data, error } = await supabase
      .from('rsvps')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[API RSVPS] Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch RSVPs', details: error.message },
        { status: 500 }
      );
    }

    console.log('[API RSVPS] Successfully fetched', data?.length || 0, 'RSVPs');
    return NextResponse.json({ rsvps: data || [] });
  } catch (error) {
    console.error('Error fetching RSVPs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
