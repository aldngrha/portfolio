-- ─── Extensions ──────────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── Works ───────────────────────────────────────────────────────────────────
CREATE TABLE works (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug          TEXT UNIQUE NOT NULL,
  title         TEXT NOT NULL,
  tagline       TEXT NOT NULL DEFAULT '',
  description   TEXT NOT NULL DEFAULT '',
  thumbnail_url TEXT,
  tags          TEXT[] NOT NULL DEFAULT '{}',
  tech_stack    TEXT[] NOT NULL DEFAULT '{}',
  category      TEXT NOT NULL DEFAULT 'web_app',
  status        TEXT NOT NULL DEFAULT 'wip',
  live_url      TEXT,
  github_url    TEXT,
  year          INT NOT NULL DEFAULT EXTRACT(YEAR FROM NOW()),
  role          TEXT NOT NULL DEFAULT '',
  featured      BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order    INT NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE work_images (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  work_id     UUID NOT NULL REFERENCES works(id) ON DELETE CASCADE,
  url         TEXT NOT NULL,
  caption     TEXT,
  sort_order  INT NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Labs ────────────────────────────────────────────────────────────────────
CREATE TABLE labs (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug         TEXT UNIQUE NOT NULL,
  title        TEXT NOT NULL,
  description  TEXT NOT NULL DEFAULT '',
  tags         TEXT[] NOT NULL DEFAULT '{}',
  category     TEXT NOT NULL DEFAULT 'other',
  status       TEXT NOT NULL DEFAULT 'wip',
  github_url   TEXT,
  demo_url     TEXT,
  sort_order   INT NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Posts ───────────────────────────────────────────────────────────────────
CREATE TABLE posts (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug         TEXT UNIQUE NOT NULL,
  title        TEXT NOT NULL,
  excerpt      TEXT NOT NULL DEFAULT '',
  content      TEXT NOT NULL DEFAULT '',
  tags         TEXT[] NOT NULL DEFAULT '{}',
  category     TEXT NOT NULL DEFAULT 'general',
  cover_url    TEXT,
  read_time    INT NOT NULL DEFAULT 1,
  published    BOOLEAN NOT NULL DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Contact Messages ─────────────────────────────────────────────────────────
CREATE TABLE contact_messages (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  subject    TEXT NOT NULL,
  message    TEXT NOT NULL,
  read       BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Updated at trigger ───────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER works_updated_at  BEFORE UPDATE ON works  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER labs_updated_at   BEFORE UPDATE ON labs   FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER posts_updated_at  BEFORE UPDATE ON posts  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ─── Indexes ─────────────────────────────────────────────────────────────────
CREATE INDEX idx_works_slug      ON works(slug);
CREATE INDEX idx_works_featured  ON works(featured);
CREATE INDEX idx_works_category  ON works(category);
CREATE INDEX idx_labs_slug       ON labs(slug);
CREATE INDEX idx_labs_category   ON labs(category);
CREATE INDEX idx_posts_slug      ON posts(slug);
CREATE INDEX idx_posts_published ON posts(published);
