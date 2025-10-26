-- Fix search_path for generate_random_vanity_url function
CREATE OR REPLACE FUNCTION generate_random_vanity_url()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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

-- Fix search_path for ensure_vanity_url function
CREATE OR REPLACE FUNCTION ensure_vanity_url()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.vanity_url IS NULL OR NEW.vanity_url = '' THEN
    NEW.vanity_url := generate_random_vanity_url();
  END IF;
  RETURN NEW;
END;
$$;