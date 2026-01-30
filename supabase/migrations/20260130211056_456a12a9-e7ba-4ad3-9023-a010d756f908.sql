-- Add staff_id column to invited_employees table
ALTER TABLE public.invited_employees 
ADD COLUMN IF NOT EXISTS staff_id TEXT;

-- Create unique index on staff_id
CREATE UNIQUE INDEX IF NOT EXISTS idx_invited_employees_staff_id 
ON public.invited_employees(staff_id) 
WHERE staff_id IS NOT NULL;

-- Drop the old INSERT policy that requires actual_user_id
DROP POLICY IF EXISTS "Users can join a company via invite" ON public.invited_employees;

-- Create new INSERT policy that allows:
-- 1. Users to join via invite (setting actual_user_id to their own id)
-- 2. Company admins to add staff directly
CREATE POLICY "Users can join company or admins can add staff"
ON public.invited_employees
FOR INSERT
WITH CHECK (
  -- Allow users to join with their own user_id
  (auth.uid() = actual_user_id)
  OR
  -- Allow company admins to add staff (even without actual_user_id)
  (EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = company_profile_id
    AND profiles.user_id = auth.uid()
  ))
);