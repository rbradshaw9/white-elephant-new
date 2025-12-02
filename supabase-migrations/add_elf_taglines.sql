-- Add elf_taglines column to rsvps table
-- This stores AI-generated funny taglines for each elf name

ALTER TABLE rsvps 
ADD COLUMN IF NOT EXISTS elf_taglines text[];

-- Add a comment explaining the column
COMMENT ON COLUMN rsvps.elf_taglines IS 'AI-generated funny taglines for each elf name, corresponds 1:1 with elf_names array';
