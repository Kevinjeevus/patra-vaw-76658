-- Create table for custom ID card templates created by users
CREATE TABLE public.custom_id_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text,
  thumbnail_url text,
  canvas_config jsonb NOT NULL DEFAULT '{}'::jsonb,
  elements jsonb NOT NULL DEFAULT '[]'::jsonb,
  background jsonb NOT NULL DEFAULT '{"type": "color", "value": "#ffffff"}'::jsonb,
  card_dimensions jsonb NOT NULL DEFAULT '{"width": 340, "height": 214}'::jsonb,
  is_published boolean DEFAULT false,
  is_public boolean DEFAULT false,
  use_count integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.custom_id_templates ENABLE ROW LEVEL SECURITY;

-- Users can view their own templates
CREATE POLICY "Users can view their own templates"
ON public.custom_id_templates
FOR SELECT
USING (auth.uid() = created_by);

-- Users can view published public templates
CREATE POLICY "Anyone can view published public templates"
ON public.custom_id_templates
FOR SELECT
USING (is_published = true AND is_public = true);

-- Users can create their own templates
CREATE POLICY "Users can create templates"
ON public.custom_id_templates
FOR INSERT
WITH CHECK (auth.uid() = created_by);

-- Users can update their own templates
CREATE POLICY "Users can update their own templates"
ON public.custom_id_templates
FOR UPDATE
USING (auth.uid() = created_by);

-- Users can delete their own templates
CREATE POLICY "Users can delete their own templates"
ON public.custom_id_templates
FOR DELETE
USING (auth.uid() = created_by);

-- Create index for faster lookups
CREATE INDEX idx_custom_id_templates_created_by ON public.custom_id_templates(created_by);
CREATE INDEX idx_custom_id_templates_published ON public.custom_id_templates(is_published, is_public);

-- Trigger for updated_at
CREATE TRIGGER update_custom_id_templates_updated_at
BEFORE UPDATE ON public.custom_id_templates
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();