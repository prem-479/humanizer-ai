-- Create rate_limits table for token-bucket rate limiting
create table if not exists public.rate_limits (
  key text primary key,
  tokens integer not null default 5,
  last_refill timestamp with time zone not null default now(),
  created_at timestamp with time zone not null default now()
);

-- Enable RLS (though Edge Functions using service role bypass it)
alter table public.rate_limits enable row level security;

-- Add comment
comment on table public.rate_limits is 'Stores token-bucket rate limit state for AI humanization requests.';
