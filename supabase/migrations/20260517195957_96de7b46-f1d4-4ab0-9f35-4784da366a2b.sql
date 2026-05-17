
-- 1. Harden has_role to only allow self-checks (prevents role enumeration)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
      AND (_user_id = auth.uid() OR EXISTS (
        SELECT 1 FROM public.user_roles ur
        WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
      ))
  )
$$;

-- 2. Restrict listing of media bucket to admins only (individual file access by URL still public)
DROP POLICY IF EXISTS "Public can list media bucket" ON storage.objects;
DROP POLICY IF EXISTS "Public read media bucket" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view media files" ON storage.objects;

CREATE POLICY "Admins can list media bucket"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'media'
  AND public.has_role(auth.uid(), 'admin'::app_role)
);
