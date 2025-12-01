# Admin Login Troubleshooting 🔧

## Issue: "Invalid Password" Error

If you're getting a 401 Unauthorized error when trying to login to `/admin`, here's how to fix it:

## Quick Fix

### Step 1: Verify Environment Variable in Vercel

1. Go to: https://vercel.com/dashboard
2. Click your **white-elephant-new** project
3. Go to **Settings** → **Environment Variables**
4. Find **ADMIN_PASSWORD**

**Check for these common issues:**
- ❌ Variable doesn't exist → Add it
- ❌ Extra spaces in the value → Remove them
- ❌ Wrong value → Update it
- ❌ Only set for one environment → Set for ALL (Production, Preview, Development)

### Step 2: Set/Update the Password

**The correct password is:** `MiR43Tx2-`

In Vercel:
1. **Name**: `ADMIN_PASSWORD`
2. **Value**: `MiR43Tx2-` (no extra spaces!)
3. **Environments**: Select **ALL three** (Production, Preview, Development)
4. Click **Save**

### Step 3: Redeploy

After updating the environment variable:
1. Go to **Deployments** tab
2. Click **⋯** on latest deployment
3. Click **Redeploy**
4. Wait ~2 minutes for deployment

### Step 4: Check Logs

After redeploying, check the runtime logs:
1. Go to **Deployments** → Click your deployment
2. Click **Runtime Logs** tab
3. Try logging in to `/admin`
4. Look for debug output showing:
   - `receivedPasswordLength`
   - `envPasswordExists`
   - `passwordsMatch`

## Alternative: Test Locally First

Test that login works locally:

```bash
cd "/Users/ryanbradshaw/Git Projects/white-elephant-new"
npm run dev
```

Then visit: http://localhost:3000/admin

If it works locally but not in production → Environment variable issue in Vercel

## Common Causes

### 1. Environment Variable Not Set
**Fix**: Add `ADMIN_PASSWORD=MiR43Tx2-` in Vercel Settings → Environment Variables

### 2. Trailing/Leading Spaces
**Fix**: Make sure there are no spaces before or after the password value

### 3. Wrong Environment Selected
**Fix**: Ensure the variable is set for "Production" environment

### 4. Deployment Cache
**Fix**: Force redeploy or deploy with: `git commit --allow-empty -m "Force redeploy" && git push`

## Verify It's Working

After the fix, you should see in Runtime Logs:
```
Login attempt: {
  receivedPasswordLength: 10,
  envPasswordExists: true,
  envPasswordLength: 10,
  passwordsMatch: true
}
```

If you see `envPasswordExists: false` → The variable isn't set in Vercel

If you see `passwordsMatch: false` → The password value doesn't match exactly

## Current Setup

- **Local Password**: `MiR43Tx2-` (in `.env.local`)
- **Vercel Password**: Should be `MiR43Tx2-` (in Vercel Environment Variables)
- **Both must match exactly** (including the dash at the end!)

---

## Still Not Working?

Double-check these:
1. ✓ Variable name is exactly `ADMIN_PASSWORD` (all caps)
2. ✓ Variable value is exactly `MiR43Tx2-` (with dash, no spaces)
3. ✓ Variable is set for **Production** environment
4. ✓ You redeployed after setting the variable
5. ✓ You're using the custom domain (thewhiteelephantbash.com)

If all else fails, try changing the password to something simpler temporarily:
- In Vercel: Set `ADMIN_PASSWORD=test123`
- Redeploy
- Try logging in with `test123`
- Once working, change back to `MiR43Tx2-`
