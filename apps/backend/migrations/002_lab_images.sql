CREATE TABLE IF NOT EXISTS lab_images (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lab_id     UUID NOT NULL REFERENCES labs(id) ON DELETE CASCADE,
    url        TEXT NOT NULL,
    caption    TEXT,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_lab_images_lab_id ON lab_images(lab_id);
