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

-- Index for faster queries by country
CREATE INDEX IF NOT EXISTS idx_analytics_country ON analytics_events(country);

-- Members table for signup applications and member management
CREATE TABLE IF NOT EXISTS members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  -- Personal Information
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  -- Investment Background
  years_investing TEXT NOT NULL,           -- 'less-than-1', '1-3', '3-5', '5-10', '10-plus'
  trading_style TEXT NOT NULL,             -- 'day-trading', 'swing-trading', 'long-term-investing', 'options-trading', 'other'
  areas_of_expertise TEXT NOT NULL,        -- Long text field describing expertise
  macro_knowledge TEXT NOT NULL,           -- 'beginner', 'intermediate', 'advanced', 'expert'
  portfolio_size TEXT NOT NULL,            -- 'under-10k', '10k-50k', '50k-100k', '100k-500k', '500k-plus'
  -- Application Content
  investment_journey TEXT NOT NULL,        -- Long text: user's investing experience
  expectations TEXT NOT NULL,              -- Long text: what they hope to gain/contribute
  referral_source TEXT,                    -- Optional: how they heard about us
  -- Admin Fields
  status TEXT NOT NULL DEFAULT 'pending',  -- 'pending', 'approved', 'active'
  admin_notes TEXT,                        -- Admin comments and notes
  reviewed_by TEXT,                        -- Admin who reviewed the application
  reviewed_at TEXT,                        -- When the application was reviewed
  approved_at TEXT,                        -- When the application was approved
  activated_at TEXT,                       -- When the member was activated
  -- Metadata
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Index for faster lookups by email
CREATE INDEX IF NOT EXISTS idx_members_email ON members(email);

-- Index for filtering by status
CREATE INDEX IF NOT EXISTS idx_members_status ON members(status);

-- Index for sorting by creation date
CREATE INDEX IF NOT EXISTS idx_members_created_at ON members(created_at DESC);
