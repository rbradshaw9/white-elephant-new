import { NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';

export async function GET() {
  try {
    const supabase = getServiceSupabase();
    
    const { data: rsvps, error } = await supabase
      .from('rsvps')
      .select('guest_names, elf_names, elf_taglines, strategy, life_as_gift, primary_name, created_at')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching guests:', error);
      return NextResponse.json(
        { error: 'Failed to fetch guests' },
        { status: 500 }
      );
    }

    // Flatten RSVPs into individual guests
    const guests = [];
    const totalParties = rsvps?.length || 0;

    if (rsvps) {
      for (const rsvp of rsvps) {
        for (let i = 0; i < rsvp.guest_names.length; i++) {
          guests.push({
            name: rsvp.guest_names[i],
            elfName: rsvp.elf_names[i],
            elfTagline: rsvp.elf_taglines?.[i] || '',
            rsvpDate: rsvp.created_at,
            // Only include funny responses for primary contact
            strategy: i === 0 ? rsvp.strategy : undefined,
            lifeAsGift: i === 0 ? rsvp.life_as_gift : undefined,
            isPrimary: i === 0
          });
        }
      }
    }

    // Sort guests alphabetically by name
    guests.sort((a, b) => a.name.localeCompare(b.name));

    return NextResponse.json({
      guests,
      totalParties,
      totalGuests: guests.length
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
