-- Supabase Database Setup for Password Reset
-- Run this SQL in your Supabase SQL Editor

-- Create table for storing verification codes
CREATE TABLE IF NOT EXISTS password_reset_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  contact TEXT NOT NULL, -- email or phone number
  method TEXT NOT NULL CHECK (method IN ('email', 'phone')),
  code TEXT NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_reset_codes_contact ON password_reset_codes(contact);
CREATE INDEX IF NOT EXISTS idx_reset_codes_code ON password_reset_codes(code);
CREATE INDEX IF NOT EXISTS idx_reset_codes_expires ON password_reset_codes(expires_at);

-- Enable Row Level Security (RLS)
ALTER TABLE password_reset_codes ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts (for storing codes)
CREATE POLICY "Allow inserts for password reset codes"
ON password_reset_codes
FOR INSERT
TO anon
WITH CHECK (true);

-- Create policy to allow reads for verification
CREATE POLICY "Allow reads for password reset codes"
ON password_reset_codes
FOR SELECT
TO anon
USING (expires_at > NOW() AND used = false);

-- Create policy to allow updates (for marking codes as used)
CREATE POLICY "Allow updates for password reset codes"
ON password_reset_codes
FOR UPDATE
TO anon
USING (expires_at > NOW() AND used = false);

-- Function to automatically clean up expired codes (optional)
CREATE OR REPLACE FUNCTION cleanup_expired_codes()
RETURNS void AS $$
BEGIN
  DELETE FROM password_reset_codes
  WHERE expires_at < NOW() OR used = true;
END;
$$ LANGUAGE plpgsql;

-- Optional: Set up a cron job to run cleanup (requires pg_cron extension)
-- SELECT cron.schedule('cleanup-expired-codes', '0 * * * *', 'SELECT cleanup_expired_codes()');
