-- Add funny optional fields to RSVPs table
-- Run this in Supabase SQL Editor

ALTER TABLE rsvps 
ADD COLUMN IF NOT EXISTS strategy TEXT,
ADD COLUMN IF NOT EXISTS life_as_gift TEXT;

-- Add comments to document the fields
COMMENT ON COLUMN rsvps.strategy IS 'Guests White Elephant strategy choice (optional funny question)';
COMMENT ON COLUMN rsvps.life_as_gift IS 'If their life was a White Elephant gift (optional funny question)';
