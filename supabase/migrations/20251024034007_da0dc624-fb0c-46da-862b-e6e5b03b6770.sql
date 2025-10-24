-- Add address and account type fields to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS show_address_map BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS account_type TEXT DEFAULT 'individual' CHECK (account_type IN ('individual', 'company')),
ADD COLUMN IF NOT EXISTS company_verified BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS company_verification_paid_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS age INTEGER,
ADD COLUMN IF NOT EXISTS location_coordinates POINT,
ADD COLUMN IF NOT EXISTS device_info JSONB DEFAULT '{}'::jsonb;

-- Add OG fields to digital_cards if they don't exist (they should already exist from previous migration)
-- Just making sure they're there
ALTER TABLE public.digital_cards 
ADD COLUMN IF NOT EXISTS custom_og_title TEXT,
ADD COLUMN IF NOT EXISTS custom_og_description TEXT,
ADD COLUMN IF NOT EXISTS og_auto_generate BOOLEAN DEFAULT true;

-- Add comment for clarity
COMMENT ON COLUMN public.profiles.account_type IS 'Type of account: individual or company';
COMMENT ON COLUMN public.profiles.company_verified IS 'Whether company account is verified and active';
COMMENT ON COLUMN public.profiles.show_address_map IS 'Whether to display map for address on public profile';
COMMENT ON COLUMN public.digital_cards.og_auto_generate IS 'Whether to auto-generate new OG descriptions on each share';