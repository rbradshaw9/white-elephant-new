# Quick Fix Checklist ✅

## Your Site is Live But Broken - Here's Why

The RSVP form fails with **"Failed to save RSVP"** because environment variables aren't configured in Vercel.

## Fix in 3 Steps (5 minutes)

### Step 1: Go to Vercel Environment Variables
1. Visit: https://vercel.com/dashboard
2. Click your **white-elephant-new** project
3. Go to **Settings** → **Environment Variables**

### Step 2: Add These 8 Variables

For each variable below:
1. Copy the **Name**
2. Open your local `.env.local` file and copy the **Value**
3. In Vercel, paste both Name and Value
4. Select **all 3 environments** (Production, Preview, Development)
5. Click **Save**

**Required Variables:**
1. `NEXT_PUBLIC_SUPABASE_URL`
2. `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. `SUPABASE_SERVICE_ROLE_KEY`
4. `SENDGRID_API_KEY`
5. `SENDGRID_FROM_EMAIL`
6. `SENDGRID_FROM_NAME`
7. `PARTY_DATETIME`
8. `ADMIN_PASSWORD`

### Step 3: Redeploy
The latest push will auto-deploy, OR:
1. Go to **Deployments** tab
2. Click **⋯** on latest deployment
3. Click **Redeploy**

## Test
Once redeployed (takes ~2 minutes):
1. Visit your production URL
2. Go to `/rsvp`
3. Fill out the form
4. Should work! ✨

---

## Detailed Instructions
See `VERCEL_ENV_SETUP.md` for complete instructions including CLI method.
