-- SimpleLabOS Base Schema
-- Compatible with PostgreSQL 14+ / Supabase
-- 
-- This is a reference implementation of a scalable lab management schema.
-- Includes RLS (Row Level Security) policies for multi-tenant data isolation.

-- 1. LAB PROFILES (Tenants)
create table public.labs (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique not null,
  subscription_tier text default 'free' check (subscription_tier in ('free', 'pro', 'enterprise')),
  settings jsonb default '{}'::jsonb, -- Store config for currency, units, etc.
  created_at timestamptz default now()
);

-- 2. CASES (Main Work Order)
create table public.cases (
  id uuid default gen_random_uuid() primary key,
  lab_id uuid references public.labs(id) not null,
  patient_name text not null,
  doctor_name text not null,
  status text default 'received',
  
  -- The Universal Tooth Numbering string, e.g. "8,9,30"
  teeth_affected text[],
  
  -- ISO 8601 Due Date
  due_date timestamptz not null,
  
  -- Metadata
  meta jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

-- 3. PRODUCTS (Catalog)
create table public.products (
  id uuid default gen_random_uuid() primary key,
  lab_id uuid references public.labs(id) not null,
  name text not null, -- e.g. "Zirconia Crown"
  category text not null, -- e.g. "Fixed Restoration"
  base_price decimal(10,2) not null,
  active boolean default true
);

-- ROW LEVEL SECURITY (RLS) EXAMPLES
-- Ideally, a user belongs to a lab.

alter table public.cases enable row level security;

-- Policy: Users can only see cases from their own lab
-- Note: Requires a 'users' table linking auth.uid() to lab_id
create policy "Users can view own lab cases"
  on public.cases
  for select
  using (
    lab_id in (
      select lab_id from public.user_roles 
      where user_id = auth.uid()
    )
  );

-- INDEXES FOR PERFORMANCE
create index idx_cases_lab_id on public.cases(lab_id);
create index idx_cases_due_date on public.cases(due_date);
create index idx_cases_status on public.cases(status);
