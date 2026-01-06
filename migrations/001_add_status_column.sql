-- Migration: Add status column to articles table
-- Run with: wrangler d1 execute invest-collective-db --file=migrations/001_add_status_column.sql

-- Add status column with default 'published' for existing articles
ALTER TABLE articles ADD COLUMN status TEXT NOT NULL DEFAULT 'published';

-- Create index for status filtering
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);

-- Update existing articles to be published (if any)
UPDATE articles SET status = 'published' WHERE status IS NULL;
