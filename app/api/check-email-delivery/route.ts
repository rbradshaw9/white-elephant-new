import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get('email') || 'jenny.bradshaw@gmail.com';
  
  // SendGrid Activity Feed API requires additional setup
  // For now, provide instructions
  
  return NextResponse.json({
    message: 'Check SendGrid Activity Feed manually',
    instructions: [
      '1. Go to https://app.sendgrid.com/',
      '2. Click "Activity" in left sidebar',
      '3. Click "Activity Feed"',
      `4. Search for: ${email}`,
      '5. Look for:',
      '   - Status: Delivered, Processed, Deferred, Dropped, Bounced',
      '   - Subject: "🎉 New RSVP from..."',
      '   - From: rbradshaw@gmail.com',
      '6. Click on the email to see delivery details',
      '',
      'Common Issues:',
      '- "Dropped" = SendGrid blocked it (check reason)',
      '- "Bounced" = Gmail rejected it (check bounce reason)', 
      '- "Deferred" = Temporary issue, will retry',
      '- "Delivered" but not in inbox = Check Gmail spam/filters',
      '',
      'Gmail-specific checks:',
      `- Check All Mail folder for from:rbradshaw@gmail.com`,
      '- Check spam folder',
      '- Check Gmail filters (Settings → Filters)',
      '- Try searching: "subject:(New RSVP from)"',
    ],
    searchEmail: email,
    sendGridDashboard: 'https://app.sendgrid.com/email_activity',
  });
}
