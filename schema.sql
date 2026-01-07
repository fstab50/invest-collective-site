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
  status TEXT NOT NULL DEFAULT 'draft', -- 'draft' or 'published'
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Index for faster lookups by slug
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);

-- Index for sorting by date
CREATE INDEX IF NOT EXISTS idx_articles_date ON articles(date DESC);

-- Index for searching by topics (will need to use LIKE for JSON search)
CREATE INDEX IF NOT EXISTS idx_articles_topics ON articles(topics);

-- Index for filtering by status
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);

-- Analytics events table for tracking article views and PDF downloads
CREATE TABLE IF NOT EXISTS analytics_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_type TEXT NOT NULL, -- 'page_view', 'article_view', 'pdf_download', 'topic_filter'
  page_path TEXT,
  article_slug TEXT,
  topic TEXT,
  user_agent TEXT,
  country TEXT,
  referrer TEXT,
  timestamp TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Index for faster queries by event type
CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics_events(event_type);

-- Index for faster queries by article slug
CREATE INDEX IF NOT EXISTS idx_analytics_article_slug ON analytics_events(article_slug);

-- Index for faster queries by page path
CREATE INDEX IF NOT EXISTS idx_analytics_page_path ON analytics_events(page_path);

-- Index for faster queries by timestamp
CREATE INDEX IF NOT EXISTS idx_analytics_timestamp ON analytics_events(timestamp DESC);

-- Index for faster queries by topic
CREATE INDEX IF NOT EXISTS idx_analytics_topic ON analytics_events(topic);
