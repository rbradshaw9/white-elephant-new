# Admin Panel Setup ⚙️

## ✅ What's New

Your admin panel now has **two tabs**:
1. **📋 RSVPs** - View and export guest list (existing)
2. **⚙️ Event Settings** - Edit party details, date/time, email settings (NEW!)

## 🚀 Quick Setup

### Step 1: Run Supabase Migration

Go to your Supabase project: https://supabase.com/dashboard/project/edocjgalhantwhndeizj

1. Click **SQL Editor** in the left sidebar
2. Click **+ New Query**
3. Copy and paste the contents of `supabase-settings-migration.sql`
4. Click **Run**

This creates the `settings` table where your event configuration is stored.

### Step 2: Access Admin Panel

Visit: `https://white-elephant-new.vercel.app/admin`

1. Login with password: `MiR43Tx2-`
2. Click the **⚙️ Event Settings** tab
3. Edit any field (party date, address, email name, etc.)
4. Click **💾 Save Settings**

### Step 3: Update Environment Variable (Optional)

If you changed the email "From Name", update it in Vercel:

1. Go to Vercel → Settings → Environment Variables
2. Update `SENDGRID_FROM_NAME` to match what you set in admin
3. Redeploy

## 📝 What You Can Edit

From the admin panel, you can now change:

- **Event Title** - "The White Elephant Bash 2025"
- **Party Date & Time** - Automatically updates countdown
- **Party Address** - Where the party happens
- **Description** - Hero section tagline
- **Dress Code** - What to wear
- **Gift Price Range** - Budget guidelines
- **Email "From" Name** - Sender name in RSVP emails

## 🎨 Gallery Images (Fixed)

The image errors are now fixed with placeholders.

**To use your own images:**
1. Upload images to `/public/images/2024/` folder
2. Edit `lib/gallery2024.ts`
3. Replace placeholder URLs with `/images/2024/your-image.jpg`
4. Commit and push

Example:
```typescript
{
  id: '1',
  type: 'image',
  src: '/images/2024/my-party-photo.jpg',  // Your actual image
  alt: 'Party photo'
}
```

## 📧 Email Template Editing

Currently, the email template is in `lib/sendEmail.ts`.

**To customize emails:**
1. Edit `/lib/sendEmail.ts` (HTML/CSS in the template)
2. Commit and push to deploy changes

**Coming Soon:**
- Visual email template editor in admin panel
- Preview emails before sending
- Custom email variables

## 🔧 Settings Persistence

Settings are saved to Supabase and persist across deployments. However:
- Changes to core config files still require redeploy
- Email template changes require code updates (for now)
- Date/time updates are live immediately (countdown updates automatically)

## 📊 Current Status

✅ Admin login working
✅ RSVP management working
✅ Settings editor working
✅ Gallery placeholders showing
✅ Email sending working
⏳ Custom domain pending
⏳ Settings table migration pending (run SQL above)

## 🎯 Next Steps

1. Run the Supabase migration (Step 1 above)
2. Test the settings editor
3. Upload your own gallery images
4. Set up custom domain (see `DOMAIN_SETUP.md`)
5. Update event details to your actual party info

---

## Need Help?

All the files you need:
- **Admin panel**: `/app/admin/page.tsx`
- **Settings component**: `/components/AdminSettings.tsx`
- **Settings API**: `/app/api/admin/settings/route.ts`
- **Supabase migration**: `supabase-settings-migration.sql`
