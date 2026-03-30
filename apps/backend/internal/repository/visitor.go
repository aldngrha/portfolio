package repository

import (
	"context"

	"github.com/aldngrha/portfolio-backend/internal/domain"
	"github.com/jackc/pgx/v5/pgxpool"
)

type VisitorRepository struct {
	db *pgxpool.Pool
}

func NewVisitorRepository(db *pgxpool.Pool) *VisitorRepository {
	return &VisitorRepository{db: db}
}

func (r *VisitorRepository) Create(ctx context.Context, v *domain.Visitor) error {
	query := `
		INSERT INTO visitors (path, method, ip_hash, user_agent, referer)
		VALUES ($1, $2, $3, $4, $5)
	`
	_, err := r.db.Exec(ctx, query, v.Path, v.Method, v.IPHash, v.UserAgent, v.Referer)
	return err
}

func (r *VisitorRepository) GetStats(ctx context.Context) (*domain.VisitorStats, error) {
	var stats domain.VisitorStats

	// Total hits and unique visitors (all time)
	queryAll := `
		SELECT
			COUNT(*),
			COUNT(DISTINCT ip_hash)
		FROM visitors
	`
	err := r.db.QueryRow(ctx, queryAll).Scan(&stats.TotalHits, &stats.UniqueVisitors)
	if err != nil {
		return nil, err
	}

	// Hits and unique visitors (last 24 hours)
	queryLast24h := `
		SELECT
			COUNT(*),
			COUNT(DISTINCT ip_hash)
		FROM visitors
		WHERE created_at > NOW() - INTERVAL '24 hours'
	`
	err = r.db.QueryRow(ctx, queryLast24h).Scan(&stats.HitsLast24h, &stats.UniqueLast24h)
	if err != nil {
		return nil, err
	}

	return &stats, nil
}

func (r *VisitorRepository) GetRecent(ctx context.Context, limit int) ([]domain.Visitor, error) {
	query := `
		SELECT id, path, method, ip_hash, user_agent, referer, created_at
		FROM visitors
		ORDER BY created_at DESC
		LIMIT $1
	`
	rows, err := r.db.Query(ctx, query, limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var visitors []domain.Visitor
	for rows.Next() {
		var v domain.Visitor
		err := rows.Scan(&v.ID, &v.Path, &v.Method, &v.IPHash, &v.UserAgent, &v.Referer, &v.CreatedAt)
		if err != nil {
			return nil, err
		}
		visitors = append(visitors, v)
	}
	return visitors, nil
}

func (r *VisitorRepository) FindAll(ctx context.Context, page, perPage int) ([]domain.Visitor, int, error) {
	var total int
	err := r.db.QueryRow(ctx, "SELECT COUNT(*) FROM visitors").Scan(&total)
	if err != nil {
		return nil, 0, err
	}

	offset := (page - 1) * perPage
	query := `
		SELECT id, path, method, ip_hash, user_agent, referer, created_at
		FROM visitors
		ORDER BY created_at DESC
		LIMIT $1 OFFSET $2
	`
	rows, err := r.db.Query(ctx, query, perPage, offset)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	var visitors []domain.Visitor
	for rows.Next() {
		var v domain.Visitor
		err := rows.Scan(&v.ID, &v.Path, &v.Method, &v.IPHash, &v.UserAgent, &v.Referer, &v.CreatedAt)
		if err != nil {
			return nil, 0, err
		}
		visitors = append(visitors, v)
	}
	return visitors, total, nil
}

type DailyStat struct {
	Date   string `json:"date"`
	Hits   int    `json:"hits"`
	Unique int    `json:"unique"`
}

func (r *VisitorRepository) GetDailyStats(ctx context.Context, days int) ([]DailyStat, error) {
	query := `
		SELECT
			TO_CHAR(d.day, 'YYYY-MM-DD') as date,
			COUNT(v.id) as hits,
			COUNT(DISTINCT v.ip_hash) as unique_visitors
		FROM (
			SELECT generate_series(
				current_date - ($1 - 1) * interval '1 day',
				current_date,
				interval '1 day'
			) as day
		) d
		LEFT JOIN visitors v ON DATE(v.created_at) = d.day
		GROUP BY d.day
		ORDER BY d.day ASC
	`
	rows, err := r.db.Query(ctx, query, days)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var stats []DailyStat
	for rows.Next() {
		var s DailyStat
		if err := rows.Scan(&s.Date, &s.Hits, &s.Unique); err != nil {
			return nil, err
		}
		stats = append(stats, s)
	}
	return stats, nil
}
