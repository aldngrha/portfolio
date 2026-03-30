package domain

import (
	"time"

	"github.com/google/uuid"
)

type Visitor struct {
	ID        uuid.UUID `json:"id"`
	Path      string    `json:"path"`
	Method    string    `json:"method"`
	IPHash    string    `json:"ip_hash"`
	UserAgent string    `json:"user_agent"`
	Referer   string    `json:"referer"`
	CreatedAt time.Time `json:"created_at"`
}

type VisitorStats struct {
	TotalHits       int `json:"total_hits"`
	UniqueVisitors  int `json:"unique_visitors"`
	HitsLast24h     int `json:"hits_last_24h"`
	UniqueLast24h   int `json:"unique_last_24h"`
}
