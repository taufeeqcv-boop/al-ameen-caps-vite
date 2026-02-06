-- Run this in Supabase SQL Editor to create the profiles table for auth + marketing
-- Required for Google Sign-in and marketing list

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  name_first text,
  name_last text,
  avatar_url text,
  marketing_opt_in boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Allow users to read/update their own profile
alter table public.profiles enable row level security;

create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Enable Google auth in Supabase Dashboard: Authentication → Providers → Google
-- Add your Google OAuth client ID and secret
-- Add redirect URL: https://YOUR_PROJECT.supabase.co/auth/v1/callback
