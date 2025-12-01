import { RSVP } from './supabase';

/**
 * Converts an array of RSVPs to CSV format
 */
export function convertToCSV(rsvps: RSVP[]): string {
  if (rsvps.length === 0) {
    return 'No RSVPs found';
  }

  // CSV headers
  const headers = [
    'Created At',
    'Primary Name',
    'Email',
    'Guest Count',
    'Guest Names',
    'Elf Names'
  ];

  // Convert each RSVP to a row
  const rows = rsvps.map(rsvp => [
    new Date(rsvp.created_at).toLocaleString(),
    rsvp.primary_name,
    rsvp.email,
    rsvp.guest_count.toString(),
    rsvp.guest_names.join('; '),
    rsvp.elf_names.join('; ')
  ]);

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
