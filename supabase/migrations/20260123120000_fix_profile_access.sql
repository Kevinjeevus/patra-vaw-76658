-- Allow public read of profiles so vanity URLs work for company info
DROP POLICY IF EXISTS "Public profiles are viewable by anyone" ON public.profiles;
CREATE POLICY "Public profiles are viewable by anyone"
ON public.profiles FOR SELECT
USING (true);

-- Ensure address and location_coordinates exist (idempotent)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS location_coordinates POINT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS invite_parameters JSONB DEFAULT '["display_name", "email", "phone", "job_title"]'::jsonb;
