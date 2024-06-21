-- Create a table for public professionals
create table professionals (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  avatar_url text,
  gender text,
  license text,
  specialty text,
  phone text,
  about text,
  experience text,
  name text,
  specialization_area text
);

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table professionals
  enable row level security;

create policy "Public professionals are viewable by everyone." on professionals
  for select using (true);

create policy "Users can insert their own professional." on professionals
  for insert with check ((select auth.uid()) = id);

create policy "Users can update own professional." on professionals
  for update using ((select auth.uid()) = id);

-- Create a table for public patients
create table patients (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  avatar_url text,
  gender text,
  phone text,
  about text,
  name text,
);

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table patients
  enable row level security;

create policy "Public patients are viewable by everyone." on patients
  for select using (true);

create policy "Users can insert their own patient." on patients
  for insert with check ((select auth.uid()) = id);

create policy "Users can update own patient." on patients
  for update using ((select auth.uid()) = id);

-- Set up Storage!
insert into storage.buckets (id, name)
  values ('avatars', 'avatars');

-- Set up access controls for storage.
-- See https://supabase.com/docs/guides/storage#policy-examples for more details.
create policy "Avatar images are publicly accessible." on storage.objects
  for select using (bucket_id = 'avatars');

create policy "Anyone can upload an avatar." on storage.objects
  for insert with check (bucket_id = 'avatars');