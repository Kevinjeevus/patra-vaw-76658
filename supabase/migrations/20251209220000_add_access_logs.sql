create table if not exists public.access_logs (
  id uuid not null default gen_random_uuid(),
  actor_id uuid not null references public.profiles(user_id) on delete cascade,
  target_id uuid not null references public.profiles(user_id) on delete cascade,
  action_type text not null check (action_type in ('saved_profile', 'removed_access', 'revoked_access')),
  created_at timestamp with time zone not null default now(),
  is_read boolean not null default false,
  constraint access_logs_pkey primary key (id)
);

-- Add RLS policies
alter table public.access_logs enable row level security;

-- Users can view logs where they are the actor or the target
create policy "Users can view their own logs"
  on public.access_logs
  for select
  using (auth.uid() = actor_id or auth.uid() = target_id);

-- Users can insert logs where they are the actor
create policy "Users can insert their own logs"
  on public.access_logs
  for insert
  with check (auth.uid() = actor_id);
