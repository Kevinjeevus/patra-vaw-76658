-- Add employee ID fields for corporate dashboard
-- These are display IDs, not foreign keys

ALTER TABLE public.invited_employees 
ADD COLUMN IF NOT EXISTS employee_display_id TEXT,
ADD COLUMN IF NOT EXISTS profile_display_id TEXT,
ADD COLUMN IF NOT EXISTS actual_user_id UUID REFERENCES auth.users(id);

-- Create function to generate 6-digit employee IDs
CREATE OR REPLACE FUNCTION generate_employee_id()
RETURNS TEXT AS $$
BEGIN
  RETURN LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-generate employee IDs on insert
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

DROP TRIGGER IF EXISTS trigger_set_employee_ids ON public.invited_employees;
CREATE TRIGGER trigger_set_employee_ids
  BEFORE INSERT ON public.invited_employees
  FOR EACH ROW
  EXECUTE FUNCTION set_employee_ids();

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_invited_employees_actual_user_id ON public.invited_employees(actual_user_id);
CREATE INDEX IF NOT EXISTS idx_invited_employees_employee_display_id ON public.invited_employees(employee_display_id);
