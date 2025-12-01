import sgMail from '@sendgrid/mail';
import { eventConfig } from '@/config/event';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

interface EmailData {
  to: string;
  primaryName: string;
  guestNames: string[];
  elfNames: string[];
}

export async function sendRSVPConfirmation(data: EmailData): Promise<void> {
  const { to, primaryName, guestNames, elfNames } = data;

  // Create the guest list with elf names
  const guestList = guestNames
    .map((name, index) => `<li><strong>${name}</strong> → 🎄 <em>${elfNames[index]}</em></li>`)
    .join('');

  const htmlContent = `
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
