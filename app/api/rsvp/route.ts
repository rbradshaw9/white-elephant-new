import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
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

    // Generate elf names
    const elfNames = generateElfNames(guestNames);

    // Save to Supabase
    const { data, error } = await supabase
      .from('rsvps')
      .insert([
        {
          primary_name: primaryName,
          email: email,
          guest_count: guestCount,
          guest_names: guestNames,
          elf_names: elfNames,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to save RSVP' },
        { status: 500 }
      );
    }

    // Send confirmation email
    try {
      await sendRSVPConfirmation({
        to: email,
        primaryName: primaryName,
        guestNames: guestNames,
        elfNames: elfNames,
      });
    } catch (emailError) {
      console.error('Email error:', emailError);
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
