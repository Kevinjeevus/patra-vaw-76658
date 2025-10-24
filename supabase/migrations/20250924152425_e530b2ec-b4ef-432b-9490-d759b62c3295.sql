-- Create enum types
CREATE TYPE public.user_role AS ENUM ('owner', 'admin', 'team_head', 'member', 'designer');
CREATE TYPE public.card_material AS ENUM ('metal', 'plastic', 'fiber');
CREATE TYPE public.nfc_payload_type AS ENUM ('vcard', 'url', 'encrypted_token');

-- Create companies table
CREATE TABLE public.companies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  domain TEXT UNIQUE,
  logo_url TEXT,
  brand_colors JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
  role public.user_role NOT NULL DEFAULT 'member',
  display_name TEXT,
  job_title TEXT,
  avatar_url TEXT,
  phone TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create teams table
CREATE TABLE public.teams (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  head_user_id UUID REFERENCES public.profiles(user_id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create card templates table
CREATE TABLE public.card_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  content_json JSONB NOT NULL DEFAULT '{}',
  style_tokens JSONB NOT NULL DEFAULT '{}',
  is_public BOOLEAN DEFAULT false,
  created_by UUID REFERENCES public.profiles(user_id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create digital cards table
CREATE TABLE public.digital_cards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  template_id UUID REFERENCES public.card_templates(id) ON DELETE SET NULL,
  owner_user_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content_json JSONB NOT NULL DEFAULT '{}',
  vanity_url TEXT UNIQUE,
  qr_code_url TEXT,
  is_approved BOOLEAN DEFAULT false,
  approved_by UUID REFERENCES public.profiles(user_id) ON DELETE SET NULL,
  approved_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create analytics table
CREATE TABLE public.card_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  card_id UUID NOT NULL REFERENCES public.digital_cards(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL, -- 'view', 'tap', 'share', 'download'
  user_agent TEXT,
  ip_address INET,
  city TEXT,
  country TEXT,
  device_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.card_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.digital_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.card_analytics ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for companies
CREATE POLICY "Company members can view their company" 
ON public.companies FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.company_id = companies.id
  )
);

-- Create RLS policies for digital cards
CREATE POLICY "Users can view their own cards" 
ON public.digital_cards FOR SELECT 
USING (auth.uid() = owner_user_id);

CREATE POLICY "Users can create their own cards" 
ON public.digital_cards FOR INSERT 
WITH CHECK (auth.uid() = owner_user_id);

CREATE POLICY "Users can update their own cards" 
ON public.digital_cards FOR UPDATE 
USING (auth.uid() = owner_user_id);

CREATE POLICY "Public cards are viewable by anyone" 
ON public.digital_cards FOR SELECT 
USING (is_active = true AND is_approved = true);

-- Create RLS policies for card templates
CREATE POLICY "Public templates are viewable by anyone" 
ON public.card_templates FOR SELECT 
USING (is_public = true);

CREATE POLICY "Company members can view company templates" 
ON public.card_templates FOR SELECT 
USING (
  company_id IS NULL OR 
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.company_id = card_templates.company_id
  )
);

-- Create function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger to auto-create profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_companies_updated_at
  BEFORE UPDATE ON public.companies
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_teams_updated_at
  BEFORE UPDATE ON public.teams
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_card_templates_updated_at
  BEFORE UPDATE ON public.card_templates
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_digital_cards_updated_at
  BEFORE UPDATE ON public.digital_cards
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();