-- Fix security warning: Set search_path for validate_upload_limits function
CREATE OR REPLACE FUNCTION public.validate_upload_limits()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  content_data jsonb;
  photo_cnt integer;
  video_cnt integer;
BEGIN
  content_data := NEW.content_json;
  
  -- Count photos
  photo_cnt := COALESCE(jsonb_array_length(content_data->'photos'), 0);
  
  -- Count videos (videoIntro field)
  video_cnt := CASE 
    WHEN content_data->>'videoIntro' IS NOT NULL AND content_data->>'videoIntro' != '' 
    THEN 1 
    ELSE 0 
  END;
  
  -- Validate limits
  IF photo_cnt > 5 THEN
    RAISE EXCEPTION 'Maximum 5 photos allowed';
  END IF;
  
  IF video_cnt > 2 THEN
    RAISE EXCEPTION 'Maximum 2 videos allowed';
  END IF;
  
  RETURN NEW;
END;
$$;