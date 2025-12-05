-- Update event title to remove hardcoded 2025
-- Run this in Supabase SQL Editor to update the title

UPDATE settings 
SET settings = jsonb_set(
    settings::jsonb, 
    '{title}', 
    '"The White Elephant Bash"'::jsonb
)
WHERE id = 'event_config';

-- Verify the update
SELECT settings->>'title' as current_title FROM settings WHERE id = 'event_config';
