# Supabase Setup Guide for Password Reset

## Step 1: Create Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in your project details
5. Wait for the project to be created

## Step 2: Get Your API Credentials

1. In your Supabase project, go to **Settings** → **API**
2. Copy your **Project URL** (e.g., `https://xxxxx.supabase.co`)
3. Copy your **anon/public key**

## Step 3: Update Configuration

1. Open `supabase-config.js`
2. Replace `YOUR_SUPABASE_URL` with your Project URL
3. Replace `YOUR_SUPABASE_ANON_KEY` with your anon key

## Step 4: Set Up Database

1. In Supabase, go to **SQL Editor**
2. Copy and paste the contents of `supabase-setup.sql`
3. Click **Run** to execute the SQL

This will create:
- `password_reset_codes` table
- Indexes for performance
- Row Level Security policies
- Cleanup function

## Step 5: Create Edge Functions

### Function 1: Send Verification Code

1. In Supabase, go to **Edge Functions**
2. Click **Create a new function**
3. Name it: `send-verification-code`
4. Use the code from `supabase-functions/send-verification-code/index.ts`

**Note:** You'll need to set up an email service (Resend, SendGrid, etc.) and add the API key to your Supabase secrets.

### Function 2: Reset Password

1. Create another Edge Function
2. Name it: `reset-password`
3. Use the code from `supabase-functions/reset-password/index.ts`

## Step 6: Set Up Email Service (Recommended: Resend)

1. Sign up at [https://resend.com](https://resend.com)
2. Get your API key
3. In Supabase, go to **Settings** → **Edge Functions** → **Secrets**
4. Add a secret: `RESEND_API_KEY` with your Resend API key

## Step 7: Set Up SMS Service (Optional)

For phone verification, you'll need an SMS service like:
- Twilio
- Vonage (Nexmo)
- AWS SNS

Add the API keys as secrets in Supabase.

## Testing

1. Make sure your `supabase-config.js` has the correct credentials
2. Open `reset.html` in your browser
3. Try the password reset flow
4. Check the browser console for any errors
5. Check Supabase logs for Edge Function execution

## Troubleshooting

- **"Supabase client not found"**: Make sure the Supabase CDN script loads before your config
- **"Table doesn't exist"**: Run the SQL setup script
- **"Function not found"**: Make sure Edge Functions are deployed
- **"Email not sending"**: Check your email service API key in Supabase secrets
