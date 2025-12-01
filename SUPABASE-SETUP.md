# Quick Supabase Setup Instructions

## Step-by-Step Guide

### 1. Create Supabase Project
1. Go to https://supabase.com
2. Click "Start your project"
3. Sign in (or create account)
4. Click "New Project"
5. Fill in:
   - Name: `white-elephant-party`
   - Database Password: (generate strong password - save it!)
   - Region: Choose closest to you
6. Click "Create new project"
7. Wait 2-3 minutes for setup

### 2. Run Migration SQL
1. In your Supabase dashboard, click "SQL Editor" (left sidebar)
2. Click "New query"
3. Open the file `supabase-migration.sql` in this project
4. Copy ALL the SQL code
5. Paste it into the Supabase SQL Editor
6. Click "Run" (or press Cmd/Ctrl + Enter)
7. You should see: "Success. No rows returned"

### 3. Get Your API Keys
1. Go to Settings (gear icon in left sidebar)
2. Click "API" in the settings menu
3. You'll see:
   - **Project URL** - Copy this
   - **Project API keys** section:
     - `anon` `public` key - Click "Copy" (this is your ANON_KEY)
     - `service_role` `secret` key - Click "Reveal" then "Copy" (this is your SERVICE_ROLE_KEY)

### 4. Update .env.local
Replace the placeholder values:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co  # Your Project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...  # Your anon public key
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...  # Your service_role secret key
```

### 5. Test the Connection
1. Make sure your dev server is running: `npm run dev`
2. Go to http://localhost:3000/rsvp
3. Fill out the RSVP form
4. Submit it
5. If successful, you'll see the elf name reveal animation!

### 6. Verify Data in Supabase
1. Go back to Supabase dashboard
2. Click "Table Editor" (left sidebar)
3. Select "rsvps" table
4. You should see your test RSVP!

## 🎉 That's It!

Your database is now connected and ready. When you deploy to Vercel, you'll add these same environment variables there.

## Troubleshooting

**"Invalid Supabase URL" error:**
- Make sure URL starts with `https://`
- Make sure there's no trailing slash

**"Failed to save RSVP" error:**
- Check that the migration SQL ran successfully
- Verify API keys are correct
- Check Supabase logs (Logs & Insights in dashboard)

**Can't see data in table:**
- Make sure you're looking at the right project
- Check that Row Level Security policies are enabled
- Try refreshing the Table Editor page
