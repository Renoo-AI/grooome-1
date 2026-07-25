-- ============================================================
-- GROOMME QATAR — Supabase schema
-- Run this in the Supabase SQL editor.
-- Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your env to go live.
-- ============================================================

-- Customers
create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  email text unique,
  created_at timestamptz not null default now()
);

-- Pets
create table if not exists public.pets (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.customers(id) on delete cascade,
  name text not null,
  type text check (type in ('dog','cat')),
  breed text,
  age text,
  weight text,
  notes text,
  created_at timestamptz not null default now()
);

-- Services catalogue
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text,
  price numeric,
  duration int,
  created_at timestamptz not null default now()
);

-- Appointments
create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.customers(id) on delete cascade,
  pet_id uuid references public.pets(id) on delete cascade,
  service_id uuid references public.services(id) on delete set null,
  date date not null,
  time text not null,
  status text not null default 'pending'
    check (status in ('pending','confirmed','completed','cancelled')),
  total_price numeric,
  created_at timestamptz not null default now(),
  unique (date, time)
);

-- Row Level Security (public anon can create bookings + read availability)
alter table public.customers enable row level security;
alter table public.pets enable row level security;
alter table public.services enable row level security;
alter table public.appointments enable row level security;

create policy "public can read availability"
  on public.appointments for select using (true);

create policy "public can book"
  on public.appointments for insert with check (true);

create policy "public can submit customers"
  on public.customers for insert with check (true);

create policy "public can submit pets"
  on public.pets for insert with check (true);

create policy "public can submit services"
  on public.services for insert with check (true);
