-- Create table for restricted usernames/vanity URLs
CREATE TABLE IF NOT EXISTS public.restricted_usernames (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.restricted_usernames ENABLE ROW LEVEL SECURITY;

-- Only admins can manage restricted usernames (for now, allow read for validation)
CREATE POLICY "Anyone can read restricted usernames for validation"
ON public.restricted_usernames
FOR SELECT
USING (true);

-- Insert default restricted usernames
INSERT INTO public.restricted_usernames (username, reason) VALUES
('admin', 'System reserved'),
('administrator', 'System reserved'),
('root', 'System reserved'),
('api', 'System reserved'),
('app', 'System reserved'),
('auth', 'System reserved'),
('login', 'System reserved'),
('logout', 'System reserved'),
('signup', 'System reserved'),
('register', 'System reserved'),
('dashboard', 'System reserved'),
('editor', 'System reserved'),
('settings', 'System reserved'),
('profile', 'System reserved'),
('user', 'System reserved'),
('users', 'System reserved'),
('account', 'System reserved'),
('accounts', 'System reserved'),
('help', 'System reserved'),
('support', 'System reserved'),
('contact', 'System reserved'),
('about', 'System reserved'),
('terms', 'System reserved'),
('privacy', 'System reserved'),
('docs', 'System reserved'),
('documentation', 'System reserved'),
('templates', 'System reserved'),
('template', 'System reserved'),
('analytics', 'System reserved'),
('god', 'Inappropriate'),
('fuck', 'Profanity'),
('shit', 'Profanity'),
('ass', 'Profanity'),
('bitch', 'Profanity'),
('bastard', 'Profanity'),
('damn', 'Profanity'),
('hell', 'Profanity'),
('pussy', 'Profanity'),
('dick', 'Profanity'),
('cock', 'Profanity'),
('porn', 'Inappropriate'),
('sex', 'Inappropriate'),
('nude', 'Inappropriate'),
('naked', 'Inappropriate'),
('hitler', 'Political/offensive'),
('nazi', 'Political/offensive'),
('fascist', 'Political/offensive'),
('terrorist', 'Political/offensive'),
('rape', 'Inappropriate'),
('kill', 'Violent'),
('murder', 'Violent'),
('death', 'Inappropriate'),
('suicide', 'Inappropriate')
ON CONFLICT (username) DO NOTHING;

-- Add template_id column to digital_cards if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'digital_cards' 
    AND column_name = 'template_id'
  ) THEN
    ALTER TABLE public.digital_cards 
    ADD COLUMN template_id TEXT;
  END IF;
END $$;

-- Create function to check if username is restricted
CREATE OR REPLACE FUNCTION public.is_username_restricted(check_username TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.restricted_usernames
    WHERE LOWER(username) = LOWER(check_username)
  );
END;
$$;

-- Add trigger to validate vanity_url on digital_cards
CREATE OR REPLACE FUNCTION public.validate_vanity_url()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check if vanity_url is restricted
  IF NEW.vanity_url IS NOT NULL AND public.is_username_restricted(NEW.vanity_url) THEN
    RAISE EXCEPTION 'This username is restricted and cannot be used';
  END IF;
  
  RETURN NEW;
END;
$$;

-- Drop trigger if exists and create new one
DROP TRIGGER IF EXISTS check_vanity_url_restriction ON public.digital_cards;
CREATE TRIGGER check_vanity_url_restriction
  BEFORE INSERT OR UPDATE OF vanity_url ON public.digital_cards
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_vanity_url();