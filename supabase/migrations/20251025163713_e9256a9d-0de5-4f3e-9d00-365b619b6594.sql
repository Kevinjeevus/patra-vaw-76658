-- First, drop the foreign key constraint if it exists
ALTER TABLE digital_cards
DROP CONSTRAINT IF EXISTS digital_cards_template_id_fkey;

-- Now change the column type to text
ALTER TABLE digital_cards
ALTER COLUMN template_id TYPE text;

-- Add comment to clarify it's a template identifier, not a UUID
COMMENT ON COLUMN digital_cards.template_id IS 'Template identifier (e.g., modern, classic, minimal) - stores template ID from code, not a UUID reference';