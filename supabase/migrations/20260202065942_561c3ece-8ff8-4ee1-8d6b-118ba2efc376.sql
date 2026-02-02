-- Add policy to allow public viewing of approved employees
CREATE POLICY "Public can view approved employees" 
ON public.invited_employees 
FOR SELECT 
USING (is_approved = true AND status = 'joined');