package repository

import (
	"context"
	"fmt"
	"strings"
	"time"

	"github.com/aldngrha/portfolio-backend/internal/domain"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type workRepository struct {
	db *pgxpool.Pool
}

func NewWorkRepository(db *pgxpool.Pool) domain.WorkRepository {
	return &workRepository{db: db}
}

func (r *workRepository) FindAll(filter domain.WorkFilter) ([]domain.Work, int, error) {
	ctx := context.Background()

	where := []string{"1=1"}
	args := []any{}
	i := 1

	if filter.Category != nil {
		where = append(where, fmt.Sprintf("category = $%d", i))
		args = append(args, string(*filter.Category))
		i++
	}
	if filter.Featured != nil {
		where = append(where, fmt.Sprintf("featured = $%d", i))
		args = append(args, *filter.Featured)
		i++
	}

	whereClause := strings.Join(where, " AND ")

	// Count
	var total int
	err := r.db.QueryRow(ctx, fmt.Sprintf("SELECT COUNT(*) FROM works WHERE %s", whereClause), args...).Scan(&total)
	if err != nil {
		return nil, 0, err
	}

	// Paginate
	page := filter.Page
	if page < 1 {
		page = 1
	}
	perPage := filter.PerPage
	if perPage < 1 {
		perPage = 20
	}
	offset := (page - 1) * perPage

	args = append(args, perPage, offset)
	query := fmt.Sprintf(`
		SELECT id, slug, title, tagline, description, thumbnail_url,
		       tags, tech_stack, category, status, live_url, github_url,
		       year, role, featured, sort_order, created_at, updated_at
		FROM works WHERE %s
		ORDER BY sort_order ASC, created_at DESC
		LIMIT $%d OFFSET $%d`, whereClause, i, i+1)

	rows, err := r.db.Query(ctx, query, args...)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	works := []domain.Work{}
	for rows.Next() {
		w, err := scanWork(rows)
		if err != nil {
			return nil, 0, err
		}
		works = append(works, *w)
	}

	// Load images
	for i := range works {
		imgs, err := r.loadImages(ctx, works[i].ID)
		if err == nil {
			works[i].Images = imgs
		}
	}

	return works, total, nil
}

func (r *workRepository) FindBySlug(slug string) (*domain.Work, error) {
	ctx := context.Background()
	row := r.db.QueryRow(ctx, `
		SELECT id, slug, title, tagline, description, thumbnail_url,
		       tags, tech_stack, category, status, live_url, github_url,
		       year, role, featured, sort_order, created_at, updated_at
		FROM works WHERE slug = $1`, slug)

	w, err := scanWork(row)
	if err != nil {
		if err == pgx.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}

	w.Images, _ = r.loadImages(ctx, w.ID)
	return w, nil
}

func (r *workRepository) FindByID(id string) (*domain.Work, error) {
	ctx := context.Background()
	row := r.db.QueryRow(ctx, `
		SELECT id, slug, title, tagline, description, thumbnail_url,
		       tags, tech_stack, category, status, live_url, github_url,
		       year, role, featured, sort_order, created_at, updated_at
		FROM works WHERE id = $1`, id)

	w, err := scanWork(row)
	if err != nil {
		if err == pgx.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	w.Images, _ = r.loadImages(ctx, w.ID)
	return w, nil
}

func (r *workRepository) Create(input domain.CreateWorkInput) (*domain.Work, error) {
	ctx := context.Background()
	slug := generateSlug(input.Title)

	var id string
	err := r.db.QueryRow(ctx, `
		INSERT INTO works (slug, title, tagline, description, thumbnail_url,
		                   tags, tech_stack, category, status, live_url, github_url,
		                   year, role, featured, sort_order)
		VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
		RETURNING id`,
		slug, input.Title, input.Tagline, input.Description, input.ThumbnailURL,
		input.Tags, input.TechStack, string(input.Category), string(input.Status),
		input.LiveURL, input.GithubURL, input.Year, input.Role, input.Featured, input.SortOrder,
	).Scan(&id)
	if err != nil {
		return nil, err
	}

	if len(input.Images) > 0 {
		for i, url := range input.Images {
			_, _ = r.db.Exec(ctx, "INSERT INTO work_images (work_id, url, sort_order) VALUES ($1, $2, $3)", id, url, i)
		}
	}

	return r.FindByID(id)
}

func (r *workRepository) Update(id string, input domain.UpdateWorkInput) (*domain.Work, error) {
	ctx := context.Background()

	sets := []string{"updated_at = NOW()"}
	args := []any{}
	i := 1

	if input.Title != nil        { sets = append(sets, fmt.Sprintf("title=$%d", i)); args = append(args, *input.Title); i++ }
	if input.Tagline != nil      { sets = append(sets, fmt.Sprintf("tagline=$%d", i)); args = append(args, *input.Tagline); i++ }
	if input.Description != nil  { sets = append(sets, fmt.Sprintf("description=$%d", i)); args = append(args, *input.Description); i++ }
	if input.ThumbnailURL != nil { sets = append(sets, fmt.Sprintf("thumbnail_url=$%d", i)); args = append(args, *input.ThumbnailURL); i++ }
	if input.Tags != nil         { sets = append(sets, fmt.Sprintf("tags=$%d", i)); args = append(args, input.Tags); i++ }
	if input.TechStack != nil    { sets = append(sets, fmt.Sprintf("tech_stack=$%d", i)); args = append(args, input.TechStack); i++ }
	if input.Category != nil     { sets = append(sets, fmt.Sprintf("category=$%d", i)); args = append(args, string(*input.Category)); i++ }
	if input.Status != nil       { sets = append(sets, fmt.Sprintf("status=$%d", i)); args = append(args, string(*input.Status)); i++ }
	if input.LiveURL != nil      { sets = append(sets, fmt.Sprintf("live_url=$%d", i)); args = append(args, *input.LiveURL); i++ }
	if input.GithubURL != nil    { sets = append(sets, fmt.Sprintf("github_url=$%d", i)); args = append(args, *input.GithubURL); i++ }
	if input.Year != nil         { sets = append(sets, fmt.Sprintf("year=$%d", i)); args = append(args, *input.Year); i++ }
	if input.Role != nil         { sets = append(sets, fmt.Sprintf("role=$%d", i)); args = append(args, *input.Role); i++ }
	if input.Featured != nil     { sets = append(sets, fmt.Sprintf("featured=$%d", i)); args = append(args, *input.Featured); i++ }
	if input.SortOrder != nil    { sets = append(sets, fmt.Sprintf("sort_order=$%d", i)); args = append(args, *input.SortOrder); i++ }

	args = append(args, id)
	_, err := r.db.Exec(ctx,
		fmt.Sprintf("UPDATE works SET %s WHERE id=$%d", strings.Join(sets, ","), i),
		args...)
	if err != nil {
		return nil, err
	}

	if input.Images != nil {
		_, _ = r.db.Exec(ctx, "DELETE FROM work_images WHERE work_id=$1", id)
		for idx, url := range *input.Images {
			_, _ = r.db.Exec(ctx, "INSERT INTO work_images (work_id, url, sort_order) VALUES ($1, $2, $3)", id, url, idx)
		}
	}

	return r.FindByID(id)
}

func (r *workRepository) Delete(id string) error {
	ctx := context.Background()
	_, err := r.db.Exec(ctx, "DELETE FROM works WHERE id=$1", id)
	return err
}

func (r *workRepository) Count(ctx context.Context) (int, error) {
	var count int
	err := r.db.QueryRow(ctx, "SELECT COUNT(*) FROM works").Scan(&count)
	return count, err
}

func (r *workRepository) loadImages(ctx context.Context, workID string) ([]domain.WorkImage, error) {
	rows, err := r.db.Query(ctx,
		`SELECT id, work_id, url, caption, sort_order FROM work_images WHERE work_id=$1 ORDER BY sort_order`,
		workID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	imgs := []domain.WorkImage{}
	for rows.Next() {
		var img domain.WorkImage
		if err := rows.Scan(&img.ID, &img.WorkID, &img.URL, &img.Caption, &img.SortOrder); err != nil {
			return nil, err
		}
		imgs = append(imgs, img)
	}
	return imgs, nil
}

type scanner interface {
	Scan(dest ...any) error
}

func scanWork(row scanner) (*domain.Work, error) {
	var w domain.Work
	err := row.Scan(
		&w.ID, &w.Slug, &w.Title, &w.Tagline, &w.Description, &w.ThumbnailURL,
		&w.Tags, &w.TechStack, &w.Category, &w.Status, &w.LiveURL, &w.GithubURL,
		&w.Year, &w.Role, &w.Featured, &w.SortOrder, &w.CreatedAt, &w.UpdatedAt,
	)
	return &w, err
}

func generateSlug(title string) string {
	slug := strings.ToLower(title)
	slug = strings.ReplaceAll(slug, " ", "-")
	replacer := strings.NewReplacer(
		".", "", ",", "", "!", "", "?", "", "'", "", "\"", "", "/", "-",
	)
	slug = replacer.Replace(slug)
	return fmt.Sprintf("%s-%s", slug, uuid.New().String()[:8])
}

func ptr[T any](v T) *T {
	return &v
}

var _ = time.Now // keep import
var _ = ptr[string]
