import sgMail from '@sendgrid/mail';
import { eventConfig } from '@/config/event';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

interface EmailData {
  to: string;
  primaryName: string;
  guestNames: string[];
  elfNames: string[];
}

async function getEmailTemplate(): Promise<string | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/admin/email-template`);
    if (response.ok) {
      const data = await response.json();
      return data.template;
    }
  } catch (error) {
    console.error('Failed to fetch custom email template:', error);
  }
  return null;
}

export async function sendRSVPConfirmation(data: EmailData): Promise<void> {
  const { to, primaryName, guestNames, elfNames } = data;

  // Create the guest list with elf names in beautiful HTML table
  const guestList = guestNames
    .map((name, index) => `
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 10px;">
        <tr>
          <td style="padding: 12px 15px; background: #ffffff; border-radius: 6px; border-left: 3px solid #10b981;">
            <p style="margin: 0; color: #2d3748; font-size: 15px; font-weight: 600;">${name}</p>
            <p style="margin: 5px 0 0; color: #10b981; font-size: 14px; font-weight: 500;">🧝 ${elfNames[index]}</p>
          </td>
        </tr>
      </table>
    `)
    .join('');

  // Try to get custom template, fall back to default
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
            <h2>📅 Event Details</h2>
            <p><strong>Date & Time:</strong> ${new Date(eventConfig.partyDateTime).toLocaleString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
              timeZoneName: 'short'
            })}</p>
            <p><strong>Location:</strong> ${eventConfig.address}</p>
            <p><strong>Dress Code:</strong> ${eventConfig.dressCode}</p>
            <p><strong>Gift Price Range:</strong> ${eventConfig.giftPriceRange}</p>
          </div>

          <h2>🎁 Remember:</h2>
          <ul>
            <li>✓ Bring a wrapped gift (${eventConfig.giftPriceRange})</li>
            <li>✓ Arrive by 7:00 PM</li>
            <li>✓ Wear your ugliest Christmas sweater</li>
            <li>✓ Bring your competitive spirit!</li>
          </ul>

          <p class="footer">
            See you at the party! 🎅<br>
            Questions? Reply to this email.
          </p>
        </div>
      </body>
    </html>
  `;

  // Use custom template if available, otherwise use default
  let htmlContent = customTemplate || defaultTemplate;
  
  // Replace variables in the template
  htmlContent = htmlContent
    .replace(/{{PRIMARY_NAME}}/g, primaryName)
    .replace(/{{EMAIL}}/g, to)
    .replace(/{{GUEST_COUNT}}/g, guestNames.length.toString())
    .replace(/{{GUEST_LIST}}/g, guestList)
    .replace(/{{PARTY_DATETIME}}/g, new Date(eventConfig.partyDateTime).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short'
    }))
    .replace(/{{ADDRESS}}/g, eventConfig.address)
    .replace(/{{DRESS_CODE}}/g, eventConfig.dressCode)
    .replace(/{{GIFT_RANGE}}/g, eventConfig.giftPriceRange);

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
      email: process.env.SENDGRID_FROM_EMAIL!,
      name: process.env.SENDGRID_FROM_NAME || 'The White Elephant Bash'
    },
    subject: `🎄 You're confirmed for ${eventConfig.title}!`,
    text: textContent,
    html: htmlContent
  };

  await sgMail.send(msg);
}
