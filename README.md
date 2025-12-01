# White Elephant Party Website 🎄

A beautiful, interactive website for our annual White Elephant Party built with Next.js 15, TypeScript, TailwindCSS, Framer Motion, and shadcn/ui.

Guests can RSVP, get assigned fun elf/christmas nicknames, browse photos/videos from the 2024 party, and view the rules. Includes a password-protected admin dashboard for managing RSVPs with CSV export.

---

## ✨ Features

- 🎟 **RSVP Form** - Collects guest info, assigns random elf nicknames, saves to Supabase
- ✉️ **Email Confirmation** - SendGrid sends beautiful HTML emails with party details
- 🎞 **2024 Gallery** - Photos & videos in a fullscreen lightbox with smooth animations
- 📜 **Rules Page** - Classic, house, and "chaos mode" White Elephant rules
- ⏰ **Live Countdown** - Real-time countdown to party time
- 🧑‍💻 **Admin Dashboard** - View RSVPs, export CSV, password-protected
- ❄️ **Falling Snow** - Beautiful animated snowfall on all pages
- 🎨 **Premium Design** - Apple-quality design with smooth Framer Motion animations

---

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd white-elephant-new
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** in your Supabase dashboard
3. Copy and paste the contents of `supabase-migration.sql`
4. Run the migration to create the `rsvps` table
5. Get your project credentials from **Settings > API**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (optional, for admin features)

### 3. Set Up SendGrid

1. Create account at [sendgrid.com](https://sendgrid.com)
2. Create an API key with "Mail Send" permissions
3. Verify a sender email address in SendGrid
4. Copy your API key for the `.env.local` file

### 4. Configure Environment Variables

Update `.env.local` with your actual values:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# SendGrid
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=your-verified-email@example.com
SENDGRID_FROM_NAME=White Elephant Host

# Party Details (already set to Dec 13, 2025, 6pm MST)
PARTY_DATETIME=2025-12-13T18:00:00-07:00

# Admin Access
ADMIN_PASSWORD=your_secure_password
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
app/
  page.tsx                    # Home page with hero, countdown, event details
  rsvp/page.tsx              # RSVP form with success animation
  gallery/page.tsx           # Photo/video gallery with lightbox
  rules/page.tsx             # White Elephant rules
  admin/page.tsx             # Admin dashboard (password protected)
  api/
    rsvp/route.ts            # RSVP submission API
    admin/
      login/route.ts         # Admin authentication
      rsvps/route.ts         # Fetch RSVPs
components/
  Navbar.tsx                 # Navigation with mobile menu
  Footer.tsx                 # Footer with holiday emojis
  Snowfall.tsx               # Animated falling snow
  Countdown.tsx              # Live countdown timer
  RSVPForm.tsx               # RSVP form with validation
  ElfNameReveal.tsx          # Success animation
  GalleryGrid.tsx            # Gallery grid + lightbox modal
  AdminRsvpTable.tsx         # Admin RSVP table with CSV export
  ui/                        # shadcn/ui components
lib/
  supabase.ts                # Supabase client
  elfNames.ts                # Elf nickname generator
  sendEmail.ts               # SendGrid email helper
  csv.ts                     # CSV export helper
  gallery2024.ts             # Gallery data
config/
  event.ts                   # Event details & rules
public/
  images/                    # Photo files
  videos/                    # Video files
```

---

## 🎨 Adding Your Photos/Videos

Update `lib/gallery2024.ts` with your actual images:

```typescript
export const gallery2024: GalleryItem[] = [
  {
    id: '1',
    type: 'image',
    src: '/images/2024/party-1.jpg',
    alt: 'Description of photo'
  },
  {
    id: '2',
    type: 'video',
    src: '/videos/2024/highlights.mp4',
    thumbnail: '/images/2024/video-thumb.jpg',
    alt: 'Party highlights'
  },
  // Add more...
];
```

Place your files in:
- `public/images/2024/`
- `public/videos/2024/`

---

## 🚢 Deploy to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit: White Elephant Party site"
git push origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Add all environment variables from `.env.local`
5. Click "Deploy"

### 3. Verify SendGrid Integration

After deployment:
1. Go to your SendGrid dashboard
2. Complete the "Verify Integration" step by submitting a test RSVP
3. SendGrid will detect the email and confirm integration

---

## 🔐 Admin Access

Visit `/admin` and enter your admin password to:
- View all RSVPs
- See guest names and elf nicknames
- Export RSVPs as CSV
- View party statistics

---

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Email**: SendGrid Web API
- **Deployment**: Vercel

---

## 📧 SendGrid Setup Notes

This project uses **SendGrid Web API** (not SMTP). The `@sendgrid/mail` package is pre-configured in `lib/sendEmail.ts`.

When SendGrid asks you to "Verify Integration":
1. Deploy your site to Vercel
2. Submit a test RSVP from your live site
3. SendGrid will automatically detect the email
4. Click "Verify" in SendGrid dashboard

---

## 🎄 Customization

### Update Party Details

Edit `config/event.ts`:
```typescript
export const eventConfig = {
  title: 'White Elephant Party 2025',
  address: 'Your address',
  dressCode: 'Ugly Christmas Sweaters!',
  giftPriceRange: '$20 - $30',
  // ... rules, etc.
};
```

### Change Colors/Theme

Edit `app/globals.css` and Tailwind classes in components.

### Add More Elf Names

Edit `lib/elfNames.ts` to add more adjectives and nouns.

---

## 📝 License

MIT

---

Made with ❤️, hot cocoa ☕, and holiday magic ✨
