import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { settings, password } = body;

    // Validate admin password sent with request
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = getServiceSupabase();

    // Create settings table if it doesn't exist (run this SQL in Supabase first)
    // Then upsert the settings
    const { data, error } = await supabase
      .from('settings')
      .upsert([
        {
          id: 'event_config',
          settings: settings,
          updated_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Settings save error:', error);
      return NextResponse.json(
        { error: 'Failed to save settings', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Settings API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Anyone can read settings (they're public on the site anyway)
    const supabase = getServiceSupabase();

    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('id', 'event_config')
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 is "not found", which is okay for first time
      console.error('Settings fetch error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch settings' },
        { status: 500 }
      );
    }

    return NextResponse.json({ settings: data?.settings || null });
  } catch (error) {
    console.error('Settings API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
