import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    // Validate admin password
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = getServiceSupabase();

    // Delete the existing template to force using the default
    const { error } = await supabase
      .from('settings')
      .delete()
      .eq('id', 'email_template');

    if (error) {
      console.error('Email template delete error:', error);
      return NextResponse.json(
        { error: 'Failed to reset template', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: 'Email template reset to default' });
  } catch (error) {
    console.error('Reset template API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
