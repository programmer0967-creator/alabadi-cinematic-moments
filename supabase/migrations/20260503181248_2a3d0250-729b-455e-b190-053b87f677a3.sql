
-- Roles
create type public.app_role as enum ('admin');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "Users view own roles" on public.user_roles for select using (auth.uid() = user_id);
create policy "Admins manage roles" on public.user_roles for all using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- Pre-seed admin email allow-list
create table public.admin_allowlist (
  email text primary key
);
alter table public.admin_allowlist enable row level security;
insert into public.admin_allowlist(email) values ('mohammed@al-abadi.com');

-- Auto-grant admin on signup if email is allow-listed
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if exists (select 1 from public.admin_allowlist where lower(email) = lower(new.email)) then
    insert into public.user_roles(user_id, role) values (new.id, 'admin')
    on conflict do nothing;
  end if;
  return new;
end;
$$;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Packages
create table public.packages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name_ar text not null,
  name_en text not null,
  tagline_ar text,
  tagline_en text,
  badge_ar text,
  badge_en text,
  features_ar jsonb not null default '[]'::jsonb,
  features_en jsonb not null default '[]'::jsonb,
  price text,
  accent boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.packages enable row level security;
create policy "Public read packages" on public.packages for select using (true);
create policy "Admins write packages" on public.packages for all using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- Media (portfolio)
create type public.media_type as enum ('image','youtube');
create table public.media_items (
  id uuid primary key default gen_random_uuid(),
  type media_type not null,
  title_ar text,
  title_en text,
  tag_ar text,
  tag_en text,
  url text not null,
  thumbnail_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
alter table public.media_items enable row level security;
create policy "Public read media" on public.media_items for select using (true);
create policy "Admins write media" on public.media_items for all using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- Site settings (single row keyed by id='main')
create table public.site_settings (
  id text primary key,
  phone text,
  whatsapp text,
  instagram text,
  youtube text,
  facebook text,
  social_handle text,
  updated_at timestamptz not null default now()
);
alter table public.site_settings enable row level security;
create policy "Public read settings" on public.site_settings for select using (true);
create policy "Admins write settings" on public.site_settings for all using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

insert into public.site_settings(id,phone,whatsapp,instagram,youtube,facebook,social_handle) values
('main','+967779038283','967779038283','https://instagram.com/llcxrn','https://youtube.com/@llcxrn','https://facebook.com/llcxrn','llcxrn');

-- Seed packages
insert into public.packages(slug,name_ar,name_en,tagline_ar,tagline_en,badge_ar,badge_en,features_ar,features_en,accent,sort_order) values
('basic','باقة الأساس','Basic Package','بساطة أنيقة... لحظة تدوم','Elegant simplicity, a moment that lasts','العرض الأول','Offer 1',
 '["تصوير دعوة الزفاف من البيت إلى المحل","فيديو سينمائي بكاميرا احترافية","مونتاج وتلوين احترافي","تسليم بجودة HD / 4K"]'::jsonb,
 '["Wedding invitation filming from home to venue","Cinematic video with professional camera","Professional editing and color grading","HD / 4K delivery"]'::jsonb,
 false, 1),
('mobility','باقة التنقل والإبداع','Mobility & Creativity','تنوع لقطات... إبداع بلا حدود','Diverse shots, limitless creativity','العرض الثاني','Offer 2',
 '["من البيت → المحل → موقع خارجي","تصوير احترافي بلقطات متنوعة و Slow Motion","عدد 2 رونين لثبات وحركة ناعمة","تصوير درون للقطات جوية مميزة","مونتاج سينمائي متكامل وإخراج إبداعي"]'::jsonb,
 '["Home → venue → outdoor location","Professional shots with slow motion","2x Ronin gimbals for smooth movement","Drone aerial shots","Full cinematic editing and creative direction"]'::jsonb,
 false, 2),
('vip','الباقة الملكية VIP','Royal VIP Package','أوبريت زفاف متكامل... تجربة فاخرة لا تُنسى','A complete wedding operetta — a luxury experience','العرض الثالث','Offer 3',
 '["تغطية كاملة: البيت، الاستوديو، المحل، الملعب","3 كاميرات احترافية بزوايا متعددة","تصوير فيديو + صور فوتوغرافية معدّلة","تصوير درون احترافي × 2","مونتاج أوبريت: قصة، إخراج، مؤثرات، ألوان سينمائية","تسليم فاخر بجودة 4K Ultra HD"]'::jsonb,
 '["Full coverage: home, studio, venue, stadium","3 professional cameras, multiple angles","Video + edited photography","2x professional drones","Operetta-style edit: story, direction, FX, color","Luxury 4K Ultra HD delivery"]'::jsonb,
 true, 3);

-- Seed media (3 YouTube videos)
insert into public.media_items(type,title_ar,title_en,tag_ar,tag_en,url,thumbnail_url,sort_order) values
('youtube','عرس سينمائي','Cinematic Wedding','VIP','VIP','https://youtu.be/JONounjZ6nM','https://img.youtube.com/vi/JONounjZ6nM/maxresdefault.jpg',1),
('youtube','أوبريت العرس','Wedding Operetta','ملكي','Royal','https://youtu.be/6N-YnzjL3zc','https://img.youtube.com/vi/6N-YnzjL3zc/maxresdefault.jpg',2),
('youtube','تصوير خارجي','Outdoor Shoot','درون','Drone','https://youtu.be/A6SZ8Zbv20g','https://img.youtube.com/vi/A6SZ8Zbv20g/maxresdefault.jpg',3);

-- Storage bucket for media uploads
insert into storage.buckets (id, name, public) values ('media','media',true) on conflict (id) do nothing;

create policy "Public read media bucket" on storage.objects for select using (bucket_id = 'media');
create policy "Admins upload media" on storage.objects for insert with check (bucket_id = 'media' and public.has_role(auth.uid(),'admin'));
create policy "Admins update media" on storage.objects for update using (bucket_id = 'media' and public.has_role(auth.uid(),'admin'));
create policy "Admins delete media" on storage.objects for delete using (bucket_id = 'media' and public.has_role(auth.uid(),'admin'));
