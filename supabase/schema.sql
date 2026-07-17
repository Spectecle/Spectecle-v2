-- Client portal schema for spectecle.com
--
-- How to apply: open the Supabase dashboard for this project > SQL Editor >
-- New query, paste this whole file, and run it. Then copy the Project URL
-- and service_role key from Project Settings > API into SUPABASE_URL and
-- SUPABASE_SERVICE_ROLE_KEY in .env.local.

create extension if not exists pgcrypto;

create table portal_users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text,
  created_at timestamptz not null default now()
);

create table magic_link_tokens (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references portal_users(id) on delete cascade,
  token_hash text not null,
  expires_at timestamptz not null,
  used_at timestamptz,
  created_at timestamptz not null default now()
);
create index on magic_link_tokens (token_hash);

create table sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references portal_users(id) on delete cascade,
  token_hash text not null,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);
create index on sessions (token_hash);

create table service_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references portal_users(id) on delete cascade,
  service_type text not null,
  budget text,
  message text not null,
  status text not null default 'new' check (status in ('new', 'in_progress', 'done')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index on service_requests (user_id);

-- RLS is enabled with no policies. The app only ever accesses these tables
-- via the service_role key (server-only, in src/lib/supabase.ts), which
-- bypasses RLS entirely, so this doesn't affect the app. It does mean the
-- Supabase anon/public REST API can't read or write these tables at all —
-- deny-by-default protection in case the anon key is ever used elsewhere.
alter table portal_users enable row level security;
alter table magic_link_tokens enable row level security;
alter table sessions enable row level security;
alter table service_requests enable row level security;

-- Migration: dynamic per-service fields + file attachments
alter table service_requests add column details jsonb not null default '{}'::jsonb;

create table service_request_files (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references service_requests(id) on delete cascade,
  file_name text not null,
  storage_path text not null,
  content_type text,
  size_bytes bigint,
  created_at timestamptz not null default now()
);
create index on service_request_files (request_id);
alter table service_request_files enable row level security;

insert into storage.buckets (id, name, public, file_size_limit)
values ('service-request-files', 'service-request-files', false, 20971520)
on conflict (id) do nothing;
