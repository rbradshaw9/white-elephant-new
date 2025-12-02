# Setting Up TheWhiteElephantBash.com 🎄

## Quick Summary
✅ **SendGrid is perfect** - No need for Zoho/Gmail. SendGrid handles RSVP emails automatically.
✅ **Site rebranded** - Now shows "The White Elephant Bash" everywhere
🔄 **Domain setup** - Follow steps below to connect your domain

---

## Email Setup (Already Done! ✅)

### SendGrid vs Other Email Services

**You're using SendGrid - Perfect choice!**
- ✅ Sends automated RSVP confirmations
- ✅ Free tier: 100 emails/day (plenty for your party)
- ✅ Sends from: `party@thewhiteelephantbash.com` as "The White Elephant Bash"
- ✅ No domain required
- ✅ Already configured and working

**When you'd need Zoho/Google Workspace:**
- ❌ Custom email addresses (like hello@thewhiteelephantbash.com)
- ❌ Receiving emails (inbox)
- ❌ Multiple team members with email accounts

**Bottom line:** Keep SendGrid. It's designed for exactly what you're doing.

---

## Domain Setup: TheWhiteElephantBash.com

### Step 1: Update Vercel Environment Variable

In Vercel dashboard, update this variable:
- **Name**: `SENDGRID_FROM_NAME`
- **Value**: `The White Elephant Bash` (updated in code, update in Vercel too)

### Step 2: Add Custom Domain in Vercel

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Click your `white-elephant-new` project
   - Go to **Settings** → **Domains**

2. **Add TheWhiteElephantBash.com**
   - Click **Add Domain**
   - Enter: `thewhiteelephantbash.com`
   - Also add: `www.thewhiteelephantbash.com` (recommended)
   - Click **Add**

3. **Configure DNS**
   Vercel will show you DNS records to add. You'll need to add these at your domain registrar (GoDaddy, Namecheap, etc.):

   **For apex domain (thewhiteelephantbash.com):**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   ```

   **For www subdomain:**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

4. **Wait for DNS Propagation**
   - Usually takes 5-30 minutes
   - Can take up to 48 hours
   - Vercel will auto-verify and enable HTTPS

---

## Vercel Domain Setup - Detailed Steps

### Where to Buy Domain (if you haven't already)
- **Namecheap** - $8.88/year (recommended)
- **Google Domains** - Now Squarespace, $12/year
- **GoDaddy** - ~$12/year

### After Purchasing:

1. **In Vercel:**
   - Settings → Domains → Add
   - Enter: `thewhiteelephantbash.com`
   - Select your project: `white-elephant-new`

2. **In Your Domain Registrar (Namecheap/GoDaddy/etc):**
   - Go to DNS Management
   - Add the A record and CNAME record Vercel shows you
   - Save changes

3. **Verify in Vercel:**
   - Back in Vercel, it will auto-check DNS
   - Once verified, it will say "Valid Configuration"
   - SSL certificate auto-provisions (HTTPS)

### Redirect Setup (Recommended):
Set `www.thewhiteelephantbash.com` to redirect to `thewhiteelephantbash.com`:
- In Vercel, both domains will be listed
- Set one as "Primary" (recommend apex domain without www)
- Other will auto-redirect

---

## Testing Checklist

Once domain is connected:

- [ ] Visit `https://thewhiteelephantbash.com` - Site loads
- [ ] Visit `https://www.thewhiteelephantbash.com` - Redirects to non-www
- [ ] HTTPS working (green padlock in browser)
- [ ] Test RSVP form - Submits successfully
- [ ] Check email - RSVP confirmation arrives from "The White Elephant Bash"
- [ ] Visit `/admin` - Admin dashboard works
- [ ] Gallery page loads images

---

## Current Status

✅ **Deployed**: https://white-elephant-new.vercel.app
✅ **Rebranded**: "The White Elephant Bash"
✅ **Email**: SendGrid configured
✅ **Database**: Supabase connected
⏳ **Custom Domain**: Pending your setup

---

## Quick Commands

**Test the site:**
```bash
curl https://white-elephant-new.vercel.app/api/rsvp
```

**Check Vercel logs:**
```bash
vercel logs white-elephant-new
```

**Force redeploy:**
```bash
git commit --allow-empty -m "Redeploy"
git push origin main
```
