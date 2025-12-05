-- Fix email template to use {{TITLE}} placeholder instead of hardcoded text
-- Run this in Supabase SQL Editor

-- Option 1: Reset the email template to use the default (recommended)
DELETE FROM settings WHERE id = 'email_template';

-- Option 2: If you have a custom template, update it to replace hardcoded titles
-- Replace 'The White Elephant Bash 2025' with {{TITLE}} placeholder
UPDATE settings 
SET settings = jsonb_set(
    settings::jsonb,
    '{template}',
    to_jsonb(replace(settings->>'template', 'The White Elephant Bash 2025', '{{TITLE}}'))
)
WHERE id = 'email_template' 
AND settings->>'template' LIKE '%The White Elephant Bash 2025%';

-- Also replace any other variations
UPDATE settings 
SET settings = jsonb_set(
    settings::jsonb,
    '{template}',
    to_jsonb(replace(settings->>'template', 'The White Elephant Bash', '{{TITLE}}'))
)
WHERE id = 'email_template' 
AND settings->>'template' LIKE '%The White Elephant Bash%'
AND settings->>'template' NOT LIKE '%{{TITLE}}%';

-- Verify the changes
SELECT id, 
       CASE 
         WHEN settings->>'template' LIKE '%{{TITLE}}%' THEN 'Using placeholder ✓'
         WHEN settings->>'template' LIKE '%White Elephant Bash%' THEN 'Still has hardcoded title ✗'
         ELSE 'No template'
       END as status
FROM settings 
WHERE id IN ('email_template', 'event_config');
