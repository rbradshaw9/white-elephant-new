import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password, rsvpId } = body;

    // Validate admin password
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = getServiceSupabase();

    // Delete the RSVP
    const { error } = await supabase
      .from('rsvps')
      .delete()
      .eq('id', rsvpId);

    if (error) {
      console.error('Delete RSVP error:', error);
      return NextResponse.json(
        { error: 'Failed to delete RSVP', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
