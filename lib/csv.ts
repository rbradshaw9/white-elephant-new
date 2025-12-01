import { RSVP } from './supabase';

/**
 * Converts an array of RSVPs to CSV format with one row per guest (for name tags)
 */
export function convertToCSV(rsvps: RSVP[]): string {
  if (rsvps.length === 0) {
    return 'No RSVPs found';
  }

  // CSV headers
  const headers = [
    'RSVP Date',
    'Primary Contact',
    'Email',
    'Guest Name',
    'Elf Name',
    'Party Size'
  ];

  // Flatten: one row per guest
  const rows: string[][] = [];
  rsvps.forEach(rsvp => {
    const rsvpDate = new Date(rsvp.created_at).toLocaleDateString();
    const partySize = rsvp.guest_count.toString();
    
    rsvp.guest_names.forEach((guestName, index) => {
      rows.push([
        rsvpDate,
        rsvp.primary_name,
        rsvp.email,
        guestName,
        rsvp.elf_names[index] || '',
        partySize
      ]);
    });
  });

  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(row => 
      row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(',')
    )
  ].join('\n');

  return csvContent;
}

/**
 * Triggers a CSV download in the browser
 */
export function downloadCSV(csvContent: string, filename: string = 'rsvps.csv'): void {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
