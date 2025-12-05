import sgMail from '@sendgrid/mail';
import { getEventSettings } from '@/lib/getEventSettings';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

interface EmailData {
  to: string;
  primaryName: string;
  guestNames: string[];
  elfNames: string[];
  elfTaglines?: string[];
}

function generateCalendarLink(eventConfig: any): string {
  // Extract the datetime parts from the ISO string to preserve the local time
  // e.g., "2025-01-10T18:00:00-04:00" should be 6 PM local time
  const dateTimeMatch = eventConfig.partyDateTime.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/);
  
  if (!dateTimeMatch) {
    // Fallback to old method if format doesn't match
    const startDate = new Date(eventConfig.partyDateTime);
    const endDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000);
    const formatDateForCal = (date: Date) => date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const title = encodeURIComponent(eventConfig.title);
    const details = encodeURIComponent(`Dress Code: ${eventConfig.dressCode}\nGift Range: ${eventConfig.giftPriceRange}\n\nBring a wrapped gift and your competitive spirit!`);
    const location = encodeURIComponent(eventConfig.address);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatDateForCal(startDate)}/${formatDateForCal(endDate)}&details=${details}&location=${location}`;
  }
  
  const [, year, month, day, hour, minute, second] = dateTimeMatch;
  
  // Format as YYYYMMDDTHHMMSS (no Z = treated as local time by Google Calendar)
  const startDateTime = `${year}${month}${day}T${hour}${minute}${second}`;
  
  // Add 3 hours for end time
  const startDate = new Date(eventConfig.partyDateTime);
  const endDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000);
  const endYear = endDate.getFullYear();
  const endMonth = String(endDate.getMonth() + 1).padStart(2, '0');
  const endDay = String(endDate.getDate()).padStart(2, '0');
  const endHour = String(endDate.getHours()).padStart(2, '0');
  const endMinute = String(endDate.getMinutes()).padStart(2, '0');
  const endSecond = String(endDate.getSeconds()).padStart(2, '0');
  const endDateTime = `${endYear}${endMonth}${endDay}T${endHour}${endMinute}${endSecond}`;
  
  const title = encodeURIComponent(eventConfig.title);
  const details = encodeURIComponent(`Dress Code: ${eventConfig.dressCode}\nGift Range: ${eventConfig.giftPriceRange}\n\nBring a wrapped gift and your competitive spirit!`);
  const location = encodeURIComponent(eventConfig.address);
  
  // Using ctz parameter to specify timezone
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDateTime}/${endDateTime}&ctz=America/Puerto_Rico&details=${details}&location=${location}`;
}

function generateManageRsvpLink(email: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://thewhiteelephantbash.com';
  return `${baseUrl}/rsvp?email=${encodeURIComponent(email)}`;
}

async function getEmailTemplate(): Promise<string | null> {
  try {
    // Don't use fetch in server context - directly query database instead
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data, error } = await supabase
      .from('settings')
      .select('settings')
      .eq('id', 'email_template')
      .single();

    if (error || !data) {
      return null;
    }

    return data.settings?.template as string;
  } catch (error) {
    console.error('Failed to fetch custom email template:', error);
  }
  return null;
}

export async function sendRSVPConfirmation(data: EmailData): Promise<void> {
  const { to, primaryName, guestNames, elfNames, elfTaglines = [] } = data;

  // Load event settings from database
  const eventConfig = await getEventSettings();

  // Create the guest list with elf names in beautiful HTML table
  const guestList = guestNames
    .map((name, index) => `
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 10px;">
        <tr>
          <td style="padding: 12px 15px; background: #ffffff; border-radius: 6px; border-left: 3px solid #10b981;">
            <p style="margin: 0; color: #2d3748; font-size: 15px; font-weight: 600;">${name}</p>
            <p style="margin: 5px 0 0; color: #10b981; font-size: 14px; font-weight: 500;">🧝 ${elfNames[index]}</p>
            ${elfTaglines[index] ? `<p style="margin: 5px 0 0; color: #6b7280; font-size: 12px; font-style: italic;">"${elfTaglines[index]}"</p>` : ''}
          </td>
        </tr>
      </table>
    `)
    .join('');

  const customTemplate = await getEmailTemplate();
  
  const defaultTemplate = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: 'Georgia', serif;
            background-color: #fef9f3;
            color: #2d5016;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: white;
            border: 4px solid #c41e3a;
            border-radius: 12px;
            padding: 30px;
          }
          h1 {
            color: #c41e3a;
            text-align: center;
            font-size: 32px;
            margin-bottom: 10px;
          }
          h2 {
            color: #165b33;
            font-size: 24px;
            margin-top: 30px;
          }
          .intro {
            text-align: center;
            font-size: 18px;
            margin-bottom: 30px;
            color: #165b33;
          }
          .details {
            background-color: #fef9f3;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
          }
          .details p {
            margin: 10px 0;
            font-size: 16px;
          }
          ul {
            list-style: none;
            padding: 0;
          }
          li {
            padding: 8px 0;
            font-size: 16px;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            font-size: 14px;
            color: #666;
          }
          .emoji {
            font-size: 24px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🎄 ${eventConfig.title} 🎁</h1>
          <p class="intro">Ho ho ho! Your RSVP has been confirmed!</p>
          
          <h2>🎉 Your Party Squad</h2>
          <ul>
            ${guestList}
          </ul>

          <div class="details">
            <h2>🗓️ Event Details</h2>
            <p><strong>Date & Time:</strong> ${new Date(eventConfig.partyDateTime).toLocaleString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
              timeZone: 'America/Puerto_Rico',
              timeZoneName: 'short'
            })}</p>
            <p><strong>Location:</strong> ${eventConfig.address}</p>
            <p><strong>Dress Code:</strong> ${eventConfig.dressCode}</p>
            <p><strong>Gift Price Range:</strong> ${eventConfig.giftPriceRange}</p>
          </div>

          <h2>🎁 Remember to Bring:</h2>
          <ul>
            <li>✓ A wrapped gift (${eventConfig.giftPriceRange})</li>
            <li>✓ A dish to share (dessert, snack, appetizer - whatever sounds good!)</li>
            <li>✓ Your favorite booze if you'd like 🍷🍺</li>
            <li>✓ Your ugliest Christmas sweater</li>
            <li>✓ Your competitive spirit!</li>
          </ul>
          <p style="font-size: 14px; color: #666; margin-top: 15px;"><em>Arrive by 7:00 PM — Game starts at 7:30 sharp!</em></p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="{{CALENDAR_LINK}}" style="display: inline-block; background-color: #c41e3a; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 5px;">🗓️ Add to Calendar</a>
            <a href="{{MANAGE_RSVP_LINK}}" style="display: inline-block; background-color: #165b33; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 5px;">✏️ Manage RSVP</a>
          </div>

          <p class="footer">
            See you at the party! 🎅<br>
            Questions? Just reply to this email or send a text to Jen Bradshaw.
          </p>
        </div>
      </body>
    </html>
  `;

  // Use custom template if available, otherwise use default
  let htmlContent = customTemplate || defaultTemplate;
  
  // Generate links
  const calendarLink = generateCalendarLink(eventConfig);
  const manageRsvpLink = generateManageRsvpLink(to);
  
  console.log('[sendEmail] Using custom template:', !!customTemplate);
  console.log('[sendEmail] Calendar link:', calendarLink);
  console.log('[sendEmail] Manage RSVP link:', manageRsvpLink);
  console.log('[sendEmail] Party DateTime:', eventConfig.partyDateTime);
  
  // Format the date
  const formattedDate = new Date(eventConfig.partyDateTime).toLocaleString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'America/Puerto_Rico',
    timeZoneName: 'short'
  });
  
  console.log('[sendEmail] Formatted date:', formattedDate);
  
  // Replace variables in the template
  htmlContent = htmlContent
    .replace(/{{PRIMARY_NAME}}/g, primaryName)
    .replace(/{{EMAIL}}/g, to)
    .replace(/{{GUEST_COUNT}}/g, guestNames.length.toString())
    .replace(/{{GUEST_LIST}}/g, guestList)
    .replace(/{{PARTY_DATETIME}}/g, formattedDate)
    .replace(/{{ADDRESS}}/g, eventConfig.address)
    .replace(/{{DRESS_CODE}}/g, eventConfig.dressCode)
    .replace(/{{GIFT_RANGE}}/g, eventConfig.giftPriceRange)
    .replace(/{{CALENDAR_LINK}}/g, calendarLink)
    .replace(/{{MANAGE_RSVP_LINK}}/g, manageRsvpLink);

  const textContent = `
${eventConfig.title}

Your RSVP has been confirmed!

Your Party Squad:
${guestNames.map((name, i) => `${name} → ${elfNames[i]}`).join('\n')}

Event Details:
Date & Time: ${new Date(eventConfig.partyDateTime).toLocaleString()}
Location: ${eventConfig.address}
Dress Code: ${eventConfig.dressCode}
Gift Price Range: ${eventConfig.giftPriceRange}

Remember:
- Bring a wrapped gift (${eventConfig.giftPriceRange})
- Arrive by 7:00 PM
- Wear your ugliest Christmas sweater
- Bring your competitive spirit!

See you at the party!
  `;

  const msg = {
    to,
    from: {
      email: eventConfig.emailFromAddress || process.env.SENDGRID_FROM_EMAIL || 'party@thewhiteelephantbash.com',
      name: eventConfig.emailFromName || process.env.SENDGRID_FROM_NAME || 'The White Elephant Bash'
    },
    replyTo: {
      email: eventConfig.emailReplyTo || process.env.SENDGRID_REPLY_TO_EMAIL || 'jenny.bradshaw@gmail.com',
      name: eventConfig.emailFromName || process.env.SENDGRID_FROM_NAME || 'The White Elephant Bash'
    },
    subject: `🎄 You're confirmed for ${eventConfig.title}!`,
    text: textContent,
    html: htmlContent,
    trackingSettings: {
      clickTracking: {
        enable: false,
        enableText: false
      },
      openTracking: {
        enable: true
      }
    }
  };

  await sgMail.send(msg);
}

export async function sendNotificationEmail(data: EmailData) {
  const { to, primaryName, guestNames, elfNames, elfTaglines = [] } = data;
  const eventConfig = await getEventSettings();
  
  const guestList = guestNames.map((name, i) => `${name} → ${elfNames[i]}`).join('\n');
  
  const notificationEmail = process.env.NOTIFICATION_EMAIL || 'jenny.bradshaw@gmail.com';
  // Use authenticated domain email for better deliverability
  const notificationFromEmail = process.env.NOTIFICATION_FROM_EMAIL || 'notifications@thewhiteelephantbash.com';
  
  console.log('[sendNotificationEmail] Attempting to send notification');
  console.log('[sendNotificationEmail] To:', notificationEmail);
  console.log('[sendNotificationEmail] From:', notificationFromEmail);
  console.log('[sendNotificationEmail] Primary Name:', primaryName);
  
  // Simple, plain HTML that Gmail won't block
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New RSVP</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto;">
    <h2 style="color: #c41e3a;">New RSVP Received</h2>
    <p>Someone just RSVP'd to the White Elephant Bash!</p>
    
    <div style="background-color: #f9f9f9; padding: 15px; margin: 20px 0; border-left: 4px solid #c41e3a;">
      <p><strong>Primary Contact:</strong> ${primaryName}</p>
      <p><strong>Email:</strong> ${to}</p>
      <p><strong>Party Size:</strong> ${guestNames.length} guest${guestNames.length > 1 ? 's' : ''}</p>
      <p><strong>Guests:</strong></p>
      ${guestNames.map((name, i) => `
        <p style="margin: 5px 0;">${name} (${elfNames[i]})</p>
        ${elfTaglines[i] ? `<p style="margin: 5px 0 5px 20px; color: #666; font-style: italic; font-size: 0.9em;">"${elfTaglines[i]}"</p>` : ''}
      `).join('')}
    </div>
    
    <p>View all guests at: <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://thewhiteelephantbash.com'}/guests" style="color: #165b33;">thewhiteelephantbash.com/guests</a></p>
  </div>
</body>
</html>
  `;
  
  const textContent = `
New RSVP Received!

Primary Contact: ${primaryName}
Email: ${to}
Party Size: ${guestNames.length} guest${guestNames.length > 1 ? 's' : ''}

Guests & Elf Names:
${guestList}

Total RSVPs so far: Check the guest list at ${process.env.NEXT_PUBLIC_BASE_URL || 'https://thewhiteelephantbash.com'}/guests
  `.trim();

  // Try multiple recipients as a backup
  const recipients = notificationEmail.split(',').map(email => email.trim());
  
  const msg = {
    to: recipients,
    from: {
      email: notificationFromEmail,
      name: 'White Elephant Bash'
    },
    replyTo: {
      email: notificationFromEmail,
      name: 'White Elephant Bash'
    },
    subject: `New RSVP: ${primaryName}`,
    text: textContent,
    html: htmlContent,
    mailSettings: {
      sandboxMode: {
        enable: false
      },
      bypassListManagement: {
        enable: true
      },
      footer: {
        enable: false
      },
      spamCheck: {
        enable: false
      }
    },
    trackingSettings: {
      clickTracking: {
        enable: false,
        enableText: false
      },
      openTracking: {
        enable: false
      },
      subscriptionTracking: {
        enable: false
      }
    }
  };
  
  console.log('[sendNotificationEmail] ========================================');
  console.log('[sendNotificationEmail] NOTIFICATION EMAIL DETAILS');
  console.log('[sendNotificationEmail] To:', notificationEmail);
  console.log('[sendNotificationEmail] From:', notificationFromEmail);
  console.log('[sendNotificationEmail] Subject:', msg.subject);
  console.log('[sendNotificationEmail] Has HTML:', !!msg.html);
  console.log('[sendNotificationEmail] Has Text:', !!msg.text);
  console.log('[sendNotificationEmail] Full msg object:', JSON.stringify(msg, null, 2));
  console.log('[sendNotificationEmail] ========================================');
  
  try {
    const result = await sgMail.send(msg);
    console.log('[sendNotificationEmail] ✅ SendGrid accepted email');
    console.log('[sendNotificationEmail] Status Code:', result[0].statusCode);
    console.log('[sendNotificationEmail] Message ID:', result[0].headers['x-message-id']);
    console.log('[sendNotificationEmail] Full response:', JSON.stringify(result[0], null, 2));
    return result;
  } catch (error: any) {
    console.error('[sendNotificationEmail] ❌ SendGrid REJECTED email');
    console.error('[sendNotificationEmail] Error code:', error.code);
    console.error('[sendNotificationEmail] Error message:', error.message);
    console.error('[sendNotificationEmail] Response body:', error.response?.body);
    throw error;
  }
}
