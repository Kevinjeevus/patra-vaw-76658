-- Allow public access to ai_enabled field for profiles with public cards
CREATE POLICY "Public can view ai_enabled for public profiles"
ON public.profiles
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM public.digital_cards
    WHERE digital_cards.owner_user_id = profiles.user_id
    AND digital_cards.is_active = true
    AND digital_cards.is_approved = true
  )
);