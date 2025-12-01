import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password, rsvp } = body;

    // Validate admin password
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = getServiceSupabase();

    // Update the RSVP
    const { data, error } = await supabase
      .from('rsvps')
      .update({
        primary_name: rsvp.primary_name,
        email: rsvp.email,
        guest_count: rsvp.guest_count,
        guest_names: rsvp.guest_names,
        elf_names: rsvp.elf_names,
      })
      .eq('id', rsvp.id)
      .select()
      .single();

    if (error) {
      console.error('Update RSVP error:', error);
      return NextResponse.json(
        { error: 'Failed to update RSVP', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
