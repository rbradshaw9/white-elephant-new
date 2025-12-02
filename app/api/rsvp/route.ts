import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';
import { generateElfNames } from '@/lib/elfNames';
import { sendRSVPConfirmation } from '@/lib/sendEmail';
import { generateElfTaglines } from '@/lib/generateTagline';

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

    // Generate AI taglines for each elf name
    console.log('Generating AI taglines for:', elfNames);
    const elfTaglines = await generateElfTaglines(elfNames);
    console.log('Generated taglines:', elfTaglines);

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
          elf_taglines: elfTaglines,
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
        elfTaglines: elfTaglines,
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

    // Send notification email to Jen
    const notificationEmail = process.env.NOTIFICATION_EMAIL || 'jenny.bradshaw@gmail.com';
    console.log('[RSVP] ========================================');
    console.log('[RSVP] ATTEMPTING TO SEND NOTIFICATION EMAIL');
    console.log('[RSVP] To:', notificationEmail);
    console.log('[RSVP] From:', process.env.SENDGRID_FROM_EMAIL);
    console.log('[RSVP] For RSVP from:', primaryName, '(', email, ')');
    console.log('[RSVP] ========================================');
    
    try {
      const { sendNotificationEmail } = await import('@/lib/sendEmail');
      const result = await sendNotificationEmail({
        to: email,
        primaryName: primaryName,
        guestNames: guestNames,
        elfNames: elfNames,
        elfTaglines: elfTaglines,
      });
      console.log('[RSVP] ✅ NOTIFICATION EMAIL SENT SUCCESSFULLY');
      console.log('[RSVP] SendGrid response:', result);
    } catch (notifError: any) {
      console.error('[RSVP] ❌ NOTIFICATION EMAIL FAILED');
      console.error('[RSVP] Error message:', notifError?.message);
      console.error('[RSVP] Error code:', notifError?.code);
      console.error('[RSVP] Error response:', notifError?.response?.body);
      console.error('[RSVP] Full error:', notifError);
      // Don't fail the request if notification fails
    }

    return NextResponse.json({
      success: true,
      guestNames: guestNames,
      elfNames: elfNames,
      elfTaglines: elfTaglines,
    });
  } catch (error) {
    console.error('RSVP error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      );
    }

    const supabase = getServiceSupabase();
    const { data, error } = await supabase
      .from('rsvps')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ rsvp: null });
      }
      return NextResponse.json(
        { error: 'Failed to fetch RSVP' },
        { status: 500 }
      );
    }

    return NextResponse.json({ rsvp: data });
  } catch (error) {
    console.error('RSVP fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
