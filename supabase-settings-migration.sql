-- Create Settings table for admin-editable event configuration
-- Run this in the Supabase SQL Editor

create table if not exists settings (
  id text primary key,
  settings jsonb not null,
  updated_at timestamptz not null default now()
);

-- Enable Row Level Security
alter table settings enable row level security;

-- Allow anyone to read settings (they're public on the site)
create policy "Allow public read access to settings"
  on settings for select
  using (true);

-- Only allow authenticated users to update settings (admin only via service role)
create policy "Allow authenticated updates to settings"
  on settings for all
  to authenticated
  using (true);

-- Grant permissions
grant select on settings to anon;
grant all on settings to authenticated;

-- Insert default settings
insert into settings (id, settings, updated_at)
values (
  'event_config',
  '{"partyDateTime": "2025-12-13T18:00:00-07:00", "title": "The White Elephant Bash 2025", "address": "123 Holiday Lane, North Pole, CO 80501", "dressCode": "Ugly Christmas Sweaters Encouraged! 🎄", "giftPriceRange": "$20 - $30", "description": "Join us for an evening of laughter, gift stealing, and holiday chaos!", "emailFromName": "The White Elephant Bash"}',
  now()
)
on conflict (id) do nothing;
