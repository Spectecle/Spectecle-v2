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

-- Organizations (client display-name override by domain) — added out-of-band
-- previously in the Supabase dashboard; captured here for completeness so a
-- fresh setup from this file matches production.
create table if not exists organizations (
  domain text primary key,
  name text not null,
  created_at timestamptz not null default now()
);
alter table organizations enable row level security;

-- Migration: first-class organizations (id-based, decoupled from email
-- domain) + client contact/billing fields. Needed because multiple unrelated
-- clients can share a generic email domain (gmail.com, yahoo.com, etc.) —
-- domain can no longer be the unique identity for an organization.
alter table organizations add column if not exists id uuid not null default gen_random_uuid();
alter table organizations add column if not exists website_url text;

do $$
declare c record;
begin
  for c in
    select conname from pg_constraint
    where conrelid = 'organizations'::regclass and contype in ('p','u')
  loop
    execute format('alter table organizations drop constraint %I', c.conname);
  end loop;
end $$;

alter table organizations add primary key (id);
alter table organizations alter column domain drop not null;

alter table portal_users add column if not exists organization_id uuid references organizations(id) on delete set null;
alter table portal_users add column if not exists phone text;

-- ============================================================
-- Migration: dashboard add-on tiers (Pulse / Signal / Radar)
-- ============================================================
-- Tier lives on organizations, not portal_users, because dashboard access
-- is a per-business subscription. Admin-assigned only for now
-- (src/lib/dashboard-tiers.ts is the source of truth for the tier/feature
-- matrix); Stripe (a later phase) will collect payment but will not, by
-- itself, control this column.
alter table organizations add column if not exists dashboard_tier text
  check (dashboard_tier in ('pulse', 'signal', 'radar'));
alter table organizations add column if not exists dashboard_tier_updated_at timestamptz;
alter table organizations add column if not exists dashboard_tier_updated_by text;

-- ============================================================
-- Backfill: document already-live-but-undocumented schema drift
-- ============================================================
-- These pieces are already used throughout the app code (src/lib/auth.ts,
-- src/lib/request-messages.ts, admin/page.tsx, etc.) but were never
-- captured in this file. Written idempotently so this file is safe to
-- re-run and becomes a trustworthy source of truth again.

alter table portal_users add column if not exists status text not null default 'active';
alter table portal_users drop constraint if exists portal_users_status_check;
alter table portal_users add constraint portal_users_status_check
  check (status in ('active', 'revoked'));

alter table service_requests drop constraint if exists service_requests_status_check;
alter table service_requests add constraint service_requests_status_check
  check (status in ('new', 'in_progress', 'done', 'deleted'));

-- Ticket thread messages (src/lib/request-messages.ts,
-- src/app/api/portal/requests/[id]/messages/route.ts, TicketThread.tsx).
create table if not exists service_request_messages (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references service_requests(id) on delete cascade,
  sender_role text not null check (sender_role in ('admin', 'client')),
  sender_email text not null,
  body text not null,
  created_at timestamptz not null default now()
);
create index if not exists service_request_messages_request_id_idx
  on service_request_messages (request_id);
alter table service_request_messages enable row level security;

-- File attachments can belong to a specific thread message.
-- CAUTION: if service_request_files.message_id already has a foreign key
-- under a different auto-generated name, check for it in the Supabase
-- table editor before running this block, to avoid a duplicate/conflicting
-- constraint.
alter table service_request_files add column if not exists message_id uuid;
alter table service_request_files drop constraint if exists service_request_files_message_id_fkey;
alter table service_request_files add constraint service_request_files_message_id_fkey
  foreign key (message_id) references service_request_messages(id) on delete set null;

-- ============================================================
-- Migration: manual analytics & ranking snapshots (Phase 3)
-- ============================================================
-- One row per organization per month, admin-entered by hand (pulled from
-- GA/Search Console) until a later phase replaces this with a live API
-- integration. `rankings` is a jsonb array of {keyword, position} objects,
-- position nullable for "not ranking yet". Gated client-side by
-- src/lib/dashboard-tiers.ts's "analytics" (visitors/pageViews/notes) and
-- "rankings" (the rankings array) features.
create table if not exists analytics_snapshots (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  period_month date not null,
  visitors integer,
  page_views integer,
  notes text,
  rankings jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by text not null,
  unique (organization_id, period_month)
);
create index if not exists analytics_snapshots_org_idx on analytics_snapshots (organization_id);
alter table analytics_snapshots enable row level security;

-- ============================================================
-- Migration: GA4 property linkage (automated analytics fetch)
-- ============================================================
-- The raw numeric GA4 property ID (e.g. "123456789", not the
-- "properties/123456789" resource name) for orgs that have been linked up
-- for automatic Visitors/Page Views fetching. See src/lib/ga4.ts.
alter table organizations add column if not exists ga4_property_id text;

-- ============================================================
-- Migration: human-friendly ticket numbers (SPC-00001, SPC-00002, ...)
-- ============================================================
-- ticket_number is a plain integer; the "SPC-" prefix + zero-padding is a
-- display-layer concern (see formatTicketNumber in src/lib/ticket-number.ts).
-- Existing rows are backfilled in submission order (oldest = SPC-00001) so
-- historical tickets stay meaningfully ordered; the sequence is then
-- advanced past the backfilled range so new tickets continue counting up.
create sequence if not exists service_requests_ticket_number_seq;

alter table service_requests add column if not exists ticket_number integer;

with numbered as (
  select id, row_number() over (order by created_at asc) as rn
  from service_requests
  where ticket_number is null
)
update service_requests sr
set ticket_number = numbered.rn
from numbered
where sr.id = numbered.id;

select setval(
  'service_requests_ticket_number_seq',
  coalesce((select max(ticket_number) from service_requests), 0)
);

alter table service_requests
  alter column ticket_number set default nextval('service_requests_ticket_number_seq');
alter table service_requests alter column ticket_number set not null;

alter table service_requests drop constraint if exists service_requests_ticket_number_key;
alter table service_requests add constraint service_requests_ticket_number_key unique (ticket_number);
