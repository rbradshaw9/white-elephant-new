-- Create RSVPs table for White Elephant Party
-- Run this in the Supabase SQL Editor

create table if not exists rsvps (
  id uuid primary key default gen_random_uuid(),
  primary_name text not null,
  email text not null,
  guest_count int not null check (guest_count > 0 and guest_count <= 6),
  guest_names text[] not null,
  elf_names text[] not null,
  created_at timestamptz not null default now()
);

-- Create index for faster queries
create index if not exists rsvps_created_at_idx on rsvps (created_at desc);
create index if not exists rsvps_email_idx on rsvps (email);

-- Enable Row Level Security (RLS)
alter table rsvps enable row level security;

-- Create policy to allow public inserts (for RSVP form)
create policy "Allow public RSVP submissions"
  on rsvps for insert
  to anon
  with check (true);

-- Create policy to allow authenticated reads (for admin)
create policy "Allow authenticated reads"
  on rsvps for select
  to authenticated
  using (true);

-- Grant necessary permissions
grant usage on schema public to anon;
grant insert on rsvps to anon;
grant select on rsvps to authenticated;
