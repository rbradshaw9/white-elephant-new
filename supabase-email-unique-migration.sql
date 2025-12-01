-- Add unique constraint to email for upsert functionality
-- Run this in the Supabase SQL Editor AFTER running supabase-migration.sql

-- Add unique constraint on email
alter table rsvps add constraint rsvps_email_unique unique (email);

-- Add update policy for upserts
create policy "Allow public RSVP updates"
  on rsvps for update
  to anon
  using (true)
  with check (true);

-- Grant update permission
grant update on rsvps to anon;
