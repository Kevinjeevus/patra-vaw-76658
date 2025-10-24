-- Add onboarding_completed column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN onboarding_completed boolean DEFAULT false;

-- Update existing profiles to have onboarding completed
UPDATE public.profiles 
SET onboarding_completed = true 
WHERE display_name IS NOT NULL AND display_name != '';