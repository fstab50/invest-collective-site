-- Research articles database schema
CREATE TABLE IF NOT EXISTS articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  topics TEXT NOT NULL, -- JSON array of topic strings
  summary TEXT NOT NULL,
  html_content TEXT NOT NULL,
  pdf_url TEXT NOT NULL,
  pdf_filename TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Index for faster lookups by slug
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);

-- Index for sorting by date
CREATE INDEX IF NOT EXISTS idx_articles_date ON articles(date DESC);

-- Index for searching by topics (will need to use LIKE for JSON search)
CREATE INDEX IF NOT EXISTS idx_articles_topics ON articles(topics);
