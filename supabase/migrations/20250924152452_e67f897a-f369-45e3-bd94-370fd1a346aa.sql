-- Add missing RLS policies for teams table
CREATE POLICY "Team members can view their teams" 
ON public.teams FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.company_id = teams.company_id
  )
);

CREATE POLICY "Company admins can manage teams" 
ON public.teams FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.company_id = teams.company_id 
    AND profiles.role IN ('owner', 'admin')
  )
);

-- Add missing RLS policies for card_analytics table
CREATE POLICY "Users can view analytics for their own cards" 
ON public.card_analytics FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.digital_cards 
    WHERE digital_cards.id = card_analytics.card_id 
    AND digital_cards.owner_user_id = auth.uid()
  )
);

CREATE POLICY "System can insert analytics" 
ON public.card_analytics FOR INSERT 
WITH CHECK (true);