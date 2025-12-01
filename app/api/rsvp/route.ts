import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';
import { generateElfNames } from '@/lib/elfNames';
import { sendRSVPConfirmation } from '@/lib/sendEmail';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { primaryName, email, guestCount, guestNames } = body;

    // Validation
    if (!primaryName || !email || !guestCount || !guestNames || guestNames.length !== guestCount) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      );
    }

    // Get existing elf names to ensure global uniqueness
    let existingElfNames = new Set<string>();
    try {
      const supabaseCheck = getServiceSupabase();
      const { data: existingRsvps } = await supabaseCheck
        .from('rsvps')
        .select('elf_names');
      
      if (existingRsvps) {
        existingRsvps.forEach(rsvp => {
          rsvp.elf_names?.forEach((name: string) => existingElfNames.add(name));
        });
      }
    } catch (err) {
      console.log('Could not fetch existing elf names, proceeding anyway:', err);
    }

    // Generate elf names with global uniqueness
    const elfNames = generateElfNames(guestNames, existingElfNames);

    // Save to Supabase using service role to bypass RLS
    let supabase;
    try {
      supabase = getServiceSupabase();
    } catch (configError) {
      console.error('Supabase configuration error:', configError);
      return NextResponse.json(
        { error: 'Server configuration error', details: (configError as Error).message },
        { status: 500 }
      );
    }
    
    // Use upsert to update existing RSVP if email exists
    const { data, error } = await supabase
      .from('rsvps')
      .upsert(
        {
          email: email,
          primary_name: primaryName,
          guest_count: guestCount,
          guest_names: guestNames,
          elf_names: elfNames,
        },
        {
          onConflict: 'email',
        }
      )
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      return NextResponse.json(
        { error: 'Failed to save RSVP', details: error.message },
        { status: 500 }
      );
    }

    // Send confirmation email
    try {
      console.log('[RSVP] Sending confirmation email to:', email);
      await sendRSVPConfirmation({
        to: email,
        primaryName: primaryName,
        guestNames: guestNames,
        elfNames: elfNames,
      });
      console.log('[RSVP] Email sent successfully');
    } catch (emailError) {
      console.error('[RSVP] Email error:', emailError);
      console.error('[RSVP] Email error details:', {
        message: (emailError as Error).message,
        stack: (emailError as Error).stack
      });
      // Don't fail the request if email fails
      // The RSVP was saved successfully
    }

    return NextResponse.json({
      success: true,
      guestNames: guestNames,
      elfNames: elfNames,
    });
  } catch (error) {
    console.error('RSVP error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
