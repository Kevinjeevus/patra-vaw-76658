-- Create system_settings table
CREATE TABLE IF NOT EXISTS public.system_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read settings
CREATE POLICY "System settings are readable by everyone"
ON public.system_settings
FOR SELECT
USING (true);

-- Allow only admins to update settings
CREATE POLICY "Only admins can update system settings"
ON public.system_settings
FOR ALL
TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.user_roles
  WHERE user_id = auth.uid() AND role = 'admin'
));

-- Insert initial settings
INSERT INTO public.system_settings (key, value)
VALUES 
  ('global_settings', '{
    "maintenanceMode": false,
    "maintenanceUntil": null,
    "allowRegistrations": true,
    "requireEmailVerification": true,
    "enableAiFeatures": true,
    "maxCardsPerUser": 5,
    "showCardBgTemplate": true,
    "showBannerBgTemplate": true
  }'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Fix announcements table types constraint if it exists
-- First, drop the old constraint if we can identify it, or just alter it.
-- In Supabase, often we can't easily guess the constraint name, but let's try a safe way.
ALTER TABLE public.announcements DROP CONSTRAINT IF EXISTS announcements_type_check;
ALTER TABLE public.announcements ADD CONSTRAINT announcements_type_check 
  CHECK (type IN ('news', 'announcement', 'changelog', 'maintenance', 'info', 'warning', 'success', 'error'));

-- Create announcements_recipients if not exists
CREATE TABLE IF NOT EXISTS public.announcements_recipients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  announcement_id UUID NOT NULL REFERENCES public.announcements(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- RLS for announcements_recipients (safe way)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'announcements_recipients' AND policyname = 'Users can view their own announcements') THEN
        CREATE POLICY "Users can view their own announcements" ON public.announcements_recipients FOR SELECT USING (auth.uid() = user_id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'announcements_recipients' AND policyname = 'Users can update their announcements') THEN
        CREATE POLICY "Users can update their announcements" ON public.announcements_recipients FOR UPDATE USING (auth.uid() = user_id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'announcements_recipients' AND policyname = 'Admins can create announcement recipients') THEN
        CREATE POLICY "Admins can create announcement recipients" ON public.announcements_recipients FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));
    END IF;
END $$;
