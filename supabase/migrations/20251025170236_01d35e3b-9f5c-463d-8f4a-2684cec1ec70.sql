-- Create app_role enum for admin roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table for admin access
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Create templates table in database
CREATE TABLE public.templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  thumbnail text,
  category text NOT NULL CHECK (category IN ('card', 'profile')),
  layout text NOT NULL,
  custom_css text,
  features jsonb DEFAULT '[]'::jsonb,
  is_premium boolean DEFAULT false,
  is_public boolean DEFAULT true,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public templates are viewable by everyone"
  ON public.templates
  FOR SELECT
  USING (is_public = true);

CREATE POLICY "Admins can manage all templates"
  ON public.templates
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can create templates"
  ON public.templates
  FOR INSERT
  WITH CHECK (auth.uid() = created_by);

-- Create announcements table
CREATE TABLE public.announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  type text NOT NULL CHECK (type IN ('news', 'announcement', 'changelog', 'maintenance')),
  priority text DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  is_published boolean DEFAULT false,
  published_at timestamp with time zone,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published announcements are viewable by everyone"
  ON public.announcements
  FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admins can manage announcements"
  ON public.announcements
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Add video content columns to digital_cards
ALTER TABLE public.digital_cards 
ADD COLUMN IF NOT EXISTS video_intro text,
ADD COLUMN IF NOT EXISTS video_testimonials jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS video_snippets jsonb DEFAULT '[]'::jsonb;

-- Create trigger to update updated_at on templates
CREATE TRIGGER update_templates_updated_at
  BEFORE UPDATE ON public.templates
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger to update updated_at on announcements
CREATE TRIGGER update_announcements_updated_at
  BEFORE UPDATE ON public.announcements
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();