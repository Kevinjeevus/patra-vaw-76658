-- Add Open Graph description fields to digital_cards table
ALTER TABLE digital_cards 
ADD COLUMN IF NOT EXISTS og_description TEXT,
ADD COLUMN IF NOT EXISTS og_description_generated_at TIMESTAMP WITH TIME ZONE;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_digital_cards_og_description_generated_at 
ON digital_cards(og_description_generated_at) 
WHERE og_description_generated_at IS NOT NULL;

-- Comment on columns
COMMENT ON COLUMN digital_cards.og_description IS 'AI-generated Open Graph description for social sharing';
COMMENT ON COLUMN digital_cards.og_description_generated_at IS 'Timestamp when OG description was last generated';