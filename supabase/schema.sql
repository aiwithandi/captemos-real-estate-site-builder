create extension if not exists pgcrypto;

create table if not exists public.site_profiles (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  brand_name text not null,
  market text not null,
  contact_email text,
  contact_phone text,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(owner_id)
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id) on delete set null,
  property_external_id text,
  name text not null check (char_length(name) between 2 and 80),
  email text not null check (char_length(email) <= 160),
  phone text check (char_length(phone) <= 40),
  message text not null check (char_length(message) between 5 and 2000),
  status text not null default 'new' check (status in ('new','contacted','qualified','closed','spam')),
  created_at timestamptz not null default now()
);

create table if not exists public.matchmaker_submissions (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id) on delete set null,
  name text not null,
  email text not null,
  budget text,
  lifestyle text[] not null default '{}',
  family_profile text,
  intended_use text,
  timeframe text,
  created_at timestamptz not null default now()
);

create table if not exists public.property_cache (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  external_id text not null,
  slug text not null,
  payload jsonb not null,
  published boolean not null default true,
  synced_at timestamptz not null default now(),
  unique(owner_id, external_id),
  unique(owner_id, slug)
);

alter table public.site_profiles enable row level security;
alter table public.inquiries enable row level security;
alter table public.matchmaker_submissions enable row level security;
alter table public.property_cache enable row level security;

drop policy if exists "public reads published profile" on public.site_profiles;
create policy "public reads published profile" on public.site_profiles for select using (published = true);
drop policy if exists "owner manages profile" on public.site_profiles;
create policy "owner manages profile" on public.site_profiles for all to authenticated using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

drop policy if exists "owner reads inquiries" on public.inquiries;
create policy "owner reads inquiries" on public.inquiries for select to authenticated using (auth.uid() = owner_id);
drop policy if exists "owner updates inquiries" on public.inquiries;
create policy "owner updates inquiries" on public.inquiries for update to authenticated using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

drop policy if exists "owner reads matchmaker submissions" on public.matchmaker_submissions;
create policy "owner reads matchmaker submissions" on public.matchmaker_submissions for select to authenticated using (auth.uid() = owner_id);

drop policy if exists "public reads published properties" on public.property_cache;
create policy "public reads published properties" on public.property_cache for select using (published = true);
drop policy if exists "owner manages property cache" on public.property_cache;
create policy "owner manages property cache" on public.property_cache for all to authenticated using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

create index if not exists inquiries_owner_created_idx on public.inquiries(owner_id, created_at desc);
create index if not exists property_cache_owner_published_idx on public.property_cache(owner_id, published);
