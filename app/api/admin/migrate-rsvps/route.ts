import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';
import { generateElfNames } from '@/lib/elfNames';

/**
 * Migration endpoint to fix existing RSVPs that don't have primary person in guest list
 * This ensures every RSVP has the primary contact as the first entry in guest_names and elf_names
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    // Validate admin password
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = getServiceSupabase();

    // Get all RSVPs
    const { data: rsvps, error: fetchError } = await supabase
      .from('rsvps')
      .select('*');

    if (fetchError) {
      return NextResponse.json(
        { error: 'Failed to fetch RSVPs', details: fetchError.message },
        { status: 500 }
      );
    }

    if (!rsvps || rsvps.length === 0) {
      return NextResponse.json({ message: 'No RSVPs to migrate' });
    }

    // Collect all existing elf names for uniqueness check
    const existingElfNames = new Set<string>();
    rsvps.forEach(rsvp => {
      rsvp.elf_names?.forEach((name: string) => existingElfNames.add(name));
    });

    const updates = [];
    const migrated = [];

    for (const rsvp of rsvps) {
      // Check if primary name is already first in guest_names
      const primaryIsFirst = rsvp.guest_names && rsvp.guest_names[0] === rsvp.primary_name;
      
      if (primaryIsFirst) {
        continue; // Already migrated
      }

      // Add primary name to the beginning
      const updatedGuestNames = [rsvp.primary_name, ...(rsvp.guest_names || [])];
      
      // Generate elf names for the updated list (including primary)
      const updatedElfNames = generateElfNames(updatedGuestNames, existingElfNames);
      
      // Add newly generated names to the set
      updatedElfNames.forEach(name => existingElfNames.add(name));

      // Update the RSVP
      const { error: updateError } = await supabase
        .from('rsvps')
        .update({
          guest_names: updatedGuestNames,
          elf_names: updatedElfNames,
          guest_count: updatedGuestNames.length
        })
        .eq('id', rsvp.id);

      if (updateError) {
        console.error(`Failed to update RSVP ${rsvp.id}:`, updateError);
      } else {
        migrated.push({
          email: rsvp.email,
          primaryName: rsvp.primary_name,
          oldCount: rsvp.guest_count,
          newCount: updatedGuestNames.length,
          elfName: updatedElfNames[0]
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Migrated ${migrated.length} RSVPs`,
      migrated
    });
  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: (error as Error).message },
      { status: 500 }
    );
  }
}
