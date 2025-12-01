import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { template, password } = body;

    // Validate admin password
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = getServiceSupabase();

    // Upsert the email template
    const { data, error } = await supabase
      .from('settings')
      .upsert([
        {
          id: 'email_template',
          settings: { template },
          updated_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Email template save error:', error);
      return NextResponse.json(
        { error: 'Failed to save template', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Email template API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const supabase = getServiceSupabase();

    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('id', 'email_template')
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Email template fetch error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch template' },
        { status: 500 }
      );
    }

    return NextResponse.json({ template: data?.settings?.template || null });
  } catch (error) {
    console.error('Email template API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
