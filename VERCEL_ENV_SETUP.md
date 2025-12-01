# Vercel Environment Variables Setup

## The Problem
Your site is deployed but getting "Failed to save RSVP" errors because environment variables aren't configured in Vercel.

## Solution: Add Environment Variables to Vercel

### Step 1: Go to Vercel Dashboard
1. Visit https://vercel.com/dashboard
2. Click on your `white-elephant-new` project
3. Click **Settings** tab
4. Click **Environment Variables** in the left sidebar

### Step 2: Add All Variables

Copy and paste these **EXACTLY** (including the values):

#### Supabase Configuration
- **Name**: `NEXT_PUBLIC_SUPABASE_URL`
- **Value**: Copy from your `.env.local` file

- **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value**: Copy from your `.env.local` file

- **Name**: `SUPABASE_SERVICE_ROLE_KEY`
- **Value**: Copy from your `.env.local` file

#### SendGrid Configuration
- **Name**: `SENDGRID_API_KEY`
- **Value**: Copy from your `.env.local` file

- **Name**: `SENDGRID_FROM_EMAIL`
- **Value**: `jenny.bradshaw@gmail.com`

- **Name**: `SENDGRID_FROM_NAME`
- **Value**: `White Elephant Party`

#### Party Configuration
- **Name**: `PARTY_DATETIME`
- **Value**: `2025-12-13T18:00:00-07:00`

#### Admin Access
- **Name**: `ADMIN_PASSWORD`
- **Value**: Copy from your `.env.local` file

### Step 3: Important Settings
For each environment variable:
- **Environment**: Select "Production", "Preview", AND "Development" (check all 3)
- Click **Save** after each one

### Step 4: Redeploy
After adding all variables:
1. Go to **Deployments** tab
2. Click the ⋯ menu on your latest deployment
3. Click **Redeploy**
4. Or just push a new commit to trigger auto-deploy

### Step 5: Test
Once redeployed:
1. Visit your production site
2. Go to `/rsvp`
3. Fill out the form
4. Should work without errors!

## Important Note
**All sensitive values (API keys, passwords, etc.) should be copied from your local `.env.local` file.**

Do NOT commit API keys to GitHub. This guide references the values you already have locally.

---

## Alternative: Use Vercel CLI

If you prefer command line:

```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Link your project
vercel link

# Add environment variables (one by one)
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel env add SENDGRID_API_KEY production
vercel env add SENDGRID_FROM_EMAIL production
vercel env add SENDGRID_FROM_NAME production
vercel env add PARTY_DATETIME production
vercel env add ADMIN_PASSWORD production

# Then redeploy
vercel --prod
```
