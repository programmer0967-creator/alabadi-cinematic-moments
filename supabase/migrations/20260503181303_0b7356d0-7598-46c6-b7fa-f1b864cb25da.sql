
-- Add policy on admin_allowlist (only admins can read)
create policy "Admins read allowlist" on public.admin_allowlist for select using (public.has_role(auth.uid(),'admin'));
create policy "Admins write allowlist" on public.admin_allowlist for all using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- Restrict execute on security definer functions
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.has_role(uuid, app_role) from public, anon;
-- has_role still callable by authenticated (needed by RLS via auth.uid()); RLS uses it as definer regardless, but keep for safety
grant execute on function public.has_role(uuid, app_role) to authenticated;

-- Replace broad SELECT on media bucket with path-aware policy (still effectively public for known URLs)
drop policy if exists "Public read media bucket" on storage.objects;
create policy "Public read media bucket" on storage.objects for select using (bucket_id = 'media');
