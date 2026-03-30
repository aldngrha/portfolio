-- ─── Visitors ──────────────────────────────────────────────────────────────────
CREATE TABLE visitors (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  path        TEXT NOT NULL,
  method      TEXT NOT NULL,
  ip_hash     TEXT NOT NULL,
  user_agent  TEXT,
  referer     TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for stats aggregation
CREATE INDEX idx_visitors_created_at ON visitors(created_at);
CREATE INDEX idx_visitors_ip_hash     ON visitors(ip_hash);
