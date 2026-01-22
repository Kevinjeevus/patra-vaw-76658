-- Comprehensive Corporate Dashboard Database Fix
-- This migration fixes all database structure issues for the corporate dashboard

-- 1. Create invited_employees table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.invited_employees (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  actual_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  employee_profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  employee_display_id TEXT,
  profile_display_id TEXT,
  invite_code TEXT NOT NULL,
  status TEXT DEFAULT 'invited',
  designation TEXT,
  is_approved BOOLEAN DEFAULT false,
  data_submitted JSONB DEFAULT '{}',
  admin_notes TEXT,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 2. Add missing columns to profiles table for corporate accounts
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS account_type TEXT DEFAULT 'individual',
ADD COLUMN IF NOT EXISTS company_name TEXT,
ADD COLUMN IF NOT EXISTS company_logo_url TEXT,
ADD COLUMN IF NOT EXISTS invite_code TEXT,
ADD COLUMN IF NOT EXISTS invite_parameters JSONB DEFAULT '["display_name", "email"]'::jsonb,
ADD COLUMN IF NOT EXISTS display_parameters JSONB DEFAULT '["display_name", "email", "job_title"]'::jsonb,
ADD COLUMN IF NOT EXISTS board_member_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS employee_invite_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS payment_due_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS vanity_url TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS show_address_map BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS location_coordinates TEXT,
ADD COLUMN IF NOT EXISTS ai_enabled BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS ai_consent_given_at TIMESTAMP WITH TIME ZONE;

-- 3. Create function to generate 6-digit employee IDs
CREATE OR REPLACE FUNCTION generate_employee_id()
RETURNS TEXT AS $$
BEGIN
  RETURN LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
END;
$$ LANGUAGE plpgsql;

-- 4. Create trigger function to auto-generate employee IDs
CREATE OR REPLACE FUNCTION set_employee_ids()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.employee_display_id IS NULL THEN
    NEW.employee_display_id := generate_employee_id();
  END IF;
  IF NEW.profile_display_id IS NULL THEN
    NEW.profile_display_id := generate_employee_id();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 5. Create trigger for auto-generating employee IDs
DROP TRIGGER IF EXISTS trigger_set_employee_ids ON public.invited_employees;
CREATE TRIGGER trigger_set_employee_ids
  BEFORE INSERT ON public.invited_employees
  FOR EACH ROW
  EXECUTE FUNCTION set_employee_ids();

-- 6. Create trigger for updating timestamps on invited_employees
DROP TRIGGER IF EXISTS update_invited_employees_updated_at ON public.invited_employees;
CREATE TRIGGER update_invited_employees_updated_at
  BEFORE UPDATE ON public.invited_employees
  FOR EACH ROW 
  EXECUTE FUNCTION public.update_updated_at_column();

-- 7. Enable RLS on invited_employees
ALTER TABLE public.invited_employees ENABLE ROW LEVEL SECURITY;

-- 8. Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can view company info by invite code" ON public.profiles;
DROP POLICY IF EXISTS "Users can join a company via invite" ON public.invited_employees;
DROP POLICY IF EXISTS "Users can view their own memberships" ON public.invited_employees;
DROP POLICY IF EXISTS "Company admins can view their employees" ON public.invited_employees;
DROP POLICY IF EXISTS "Company admins can manage employees" ON public.invited_employees;

-- 9. Create RLS policies for profiles (company info access)
CREATE POLICY "Anyone can view company profiles by invite code"
ON public.profiles
FOR SELECT
USING (
  invite_code IS NOT NULL 
  OR auth.uid() = user_id
);

-- 10. Create RLS policies for invited_employees
CREATE POLICY "Users can join a company via invite"
ON public.invited_employees
FOR INSERT
WITH CHECK (auth.uid() = actual_user_id);

CREATE POLICY "Users can view their own memberships"
ON public.invited_employees
FOR SELECT
USING (auth.uid() = actual_user_id);

CREATE POLICY "Company admins can view their employees"
ON public.invited_employees
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = invited_employees.company_profile_id
    AND profiles.user_id = auth.uid()
  )
);

CREATE POLICY "Company admins can manage employees"
ON public.invited_employees
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = invited_employees.company_profile_id
    AND profiles.user_id = auth.uid()
  )
);

-- 11. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_vanity_url ON public.profiles(vanity_url);
CREATE INDEX IF NOT EXISTS idx_profiles_invite_code ON public.profiles(invite_code);
CREATE INDEX IF NOT EXISTS idx_profiles_account_type ON public.profiles(account_type);
CREATE INDEX IF NOT EXISTS idx_invited_employees_company_profile_id ON public.invited_employees(company_profile_id);
CREATE INDEX IF NOT EXISTS idx_invited_employees_actual_user_id ON public.invited_employees(actual_user_id);
CREATE INDEX IF NOT EXISTS idx_invited_employees_employee_display_id ON public.invited_employees(employee_display_id);
CREATE INDEX IF NOT EXISTS idx_invited_employees_invite_code ON public.invited_employees(invite_code);
CREATE INDEX IF NOT EXISTS idx_invited_employees_status ON public.invited_employees(status);

-- 12. Create function to auto-generate invite code for new company profiles
CREATE OR REPLACE FUNCTION generate_invite_code_for_company()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.account_type = 'company' AND NEW.invite_code IS NULL THEN
    NEW.invite_code := UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 6));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 13. Create trigger for auto-generating invite codes
DROP TRIGGER IF EXISTS trigger_generate_invite_code ON public.profiles;
CREATE TRIGGER trigger_generate_invite_code
  BEFORE INSERT OR UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION generate_invite_code_for_company();

-- 14. Add account_type to digital_cards for differentiating card types
ALTER TABLE public.digital_cards
ADD COLUMN IF NOT EXISTS account_type TEXT DEFAULT 'individual';

-- 15. Update RLS policy for digital_cards to allow deletion
DROP POLICY IF EXISTS "Users can delete their own cards" ON public.digital_cards;
CREATE POLICY "Users can delete their own cards"
ON public.digital_cards
FOR DELETE
USING (auth.uid() = owner_user_id);

COMMENT ON TABLE public.invited_employees IS 'Stores employees invited to join a company profile';
COMMENT ON TABLE public.profiles IS 'User profiles - can be individual or company accounts';
COMMENT ON COLUMN public.invited_employees.employee_display_id IS 'Auto-generated 6-digit employee ID for display';
COMMENT ON COLUMN public.invited_employees.profile_display_id IS 'Auto-generated 6-digit profile ID for display';
COMMENT ON COLUMN public.invited_employees.actual_user_id IS 'Reference to the actual auth user';
COMMENT ON COLUMN public.profiles.account_type IS 'Type of account: individual, company, or company_card';
