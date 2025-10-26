-- Function to generate random alphanumeric username (4-5 characters)
CREATE OR REPLACE FUNCTION generate_random_vanity_url()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_url text;
  url_exists boolean;
  chars text := 'abcdefghijklmnopqrstuvwxyz0123456789';
  url_length int;
BEGIN
  LOOP
    -- Randomly choose length (4 or 5)
    url_length := 4 + (random() < 0.5)::int;
    
    -- Generate random string
    new_url := '';
    FOR i IN 1..url_length LOOP
      new_url := new_url || substr(chars, floor(random() * length(chars) + 1)::int, 1);
    END LOOP;
    
    -- Check if it exists
    SELECT EXISTS (
      SELECT 1 FROM public.digital_cards WHERE vanity_url = new_url
    ) INTO url_exists;
    
    EXIT WHEN NOT url_exists;
  END LOOP;
  
  RETURN new_url;
END;
$$;

-- Update all digital_cards with null or empty vanity_url
UPDATE public.digital_cards
SET vanity_url = generate_random_vanity_url()
WHERE vanity_url IS NULL OR vanity_url = '';

-- Add a trigger to ensure vanity_url is always set
CREATE OR REPLACE FUNCTION ensure_vanity_url()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF NEW.vanity_url IS NULL OR NEW.vanity_url = '' THEN
    NEW.vanity_url := generate_random_vanity_url();
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS ensure_vanity_url_trigger ON public.digital_cards;
CREATE TRIGGER ensure_vanity_url_trigger
BEFORE INSERT OR UPDATE ON public.digital_cards
FOR EACH ROW
EXECUTE FUNCTION ensure_vanity_url();