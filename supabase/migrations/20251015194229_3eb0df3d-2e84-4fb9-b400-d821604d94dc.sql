-- Add achievements and testimonials to digital_cards content if not exists
-- These are already stored in content_json, but we need to ensure proper indexing

-- Add timezone to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS timezone text DEFAULT 'UTC';

-- Add upload limits tracking
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS photo_count integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS video_count integer DEFAULT 0;

-- Create function to validate upload limits
CREATE OR REPLACE FUNCTION public.validate_upload_limits()
RETURNS trigger
LANGUAGE plpgsql
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

-- Create trigger for upload validation
DROP TRIGGER IF EXISTS validate_uploads_trigger ON public.digital_cards;
CREATE TRIGGER validate_uploads_trigger
  BEFORE INSERT OR UPDATE ON public.digital_cards
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_upload_limits();

COMMENT ON COLUMN profiles.timezone IS 'User timezone for personalization';
COMMENT ON COLUMN profiles.photo_count IS 'Track photo uploads for limits';
COMMENT ON COLUMN profiles.video_count IS 'Track video uploads for limits';