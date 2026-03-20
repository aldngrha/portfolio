package repository

import (
	"context"
	"fmt"
	"strings"

	"github.com/aldngrha/portfolio-backend/internal/domain"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

func NewLabRepository(db *pgxpool.Pool) domain.LabRepository {
	return &labRepository{db: db}
}

type labRepository struct{ db *pgxpool.Pool }

func (r *labRepository) FindAll(filter domain.LabFilter) ([]domain.Lab, int, error) {
	ctx := context.Background()
	where := []string{"1=1"}
	args := []any{}
	i := 1

	if filter.Category != nil {
		where = append(where, fmt.Sprintf("category=$%d", i))
		args = append(args, string(*filter.Category))
		i++
	}

	whereClause := strings.Join(where, " AND ")
	var total int
	r.db.QueryRow(ctx, fmt.Sprintf("SELECT COUNT(*) FROM labs WHERE %s", whereClause), args...).Scan(&total)

	page := filter.Page; if page < 1 { page = 1 }
	perPage := filter.PerPage; if perPage < 1 { perPage = 20 }
	args = append(args, perPage, (page-1)*perPage)

	rows, err := r.db.Query(ctx, fmt.Sprintf(`
		SELECT id,slug,title,description,tags,category,status,github_url,demo_url,sort_order,created_at,updated_at
		FROM labs WHERE %s ORDER BY sort_order ASC, created_at DESC LIMIT $%d OFFSET $%d`,
		whereClause, i, i+1), args...)
	if err != nil { return nil, 0, err }
	defer rows.Close()

	labs := []domain.Lab{}
	for rows.Next() {
		var l domain.Lab
		if err := rows.Scan(&l.ID,&l.Slug,&l.Title,&l.Description,&l.Tags,&l.Category,&l.Status,&l.GithubURL,&l.DemoURL,&l.SortOrder,&l.CreatedAt,&l.UpdatedAt); err != nil {
			return nil, 0, err
		}
		l.Images, _ = r.loadImages(ctx, l.ID)
		labs = append(labs, l)
	}
	return labs, total, nil
}

func (r *labRepository) FindBySlug(slug string) (*domain.Lab, error) {
	ctx := context.Background()
	var l domain.Lab
	err := r.db.QueryRow(ctx, `SELECT id,slug,title,description,tags,category,status,github_url,demo_url,sort_order,created_at,updated_at FROM labs WHERE slug=$1`, slug).
		Scan(&l.ID,&l.Slug,&l.Title,&l.Description,&l.Tags,&l.Category,&l.Status,&l.GithubURL,&l.DemoURL,&l.SortOrder,&l.CreatedAt,&l.UpdatedAt)
	if err == pgx.ErrNoRows { return nil, nil }
	if err != nil { return nil, err }
	l.Images, _ = r.loadImages(ctx, l.ID)
	return &l, nil
}

func (r *labRepository) FindByID(id string) (*domain.Lab, error) {
	ctx := context.Background()
	var l domain.Lab
	err := r.db.QueryRow(ctx, `SELECT id,slug,title,description,tags,category,status,github_url,demo_url,sort_order,created_at,updated_at FROM labs WHERE id=$1`, id).
		Scan(&l.ID,&l.Slug,&l.Title,&l.Description,&l.Tags,&l.Category,&l.Status,&l.GithubURL,&l.DemoURL,&l.SortOrder,&l.CreatedAt,&l.UpdatedAt)
	if err == pgx.ErrNoRows { return nil, nil }
	if err != nil { return nil, err }
	l.Images, _ = r.loadImages(ctx, l.ID)
	return &l, nil
}

func (r *labRepository) loadImages(ctx context.Context, labID string) ([]domain.LabImage, error) {
	rows, err := r.db.Query(ctx,
		`SELECT id, lab_id, url, caption, sort_order FROM lab_images WHERE lab_id=$1 ORDER BY sort_order`,
		labID)
	if err != nil { return nil, err }
	defer rows.Close()

	imgs := []domain.LabImage{}
	for rows.Next() {
		var img domain.LabImage
		if err := rows.Scan(&img.ID, &img.LabID, &img.URL, &img.Caption, &img.SortOrder); err != nil {
			return nil, err
		}
		imgs = append(imgs, img)
	}
	return imgs, nil
}

func (r *labRepository) Create(input domain.CreateLabInput) (*domain.Lab, error) {
	ctx := context.Background()
	slug := generateSlug(input.Title)
	var id string
	err := r.db.QueryRow(ctx, `
		INSERT INTO labs(slug,title,description,tags,category,status,github_url,demo_url,sort_order)
		VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id`,
		slug, input.Title, input.Description, input.Tags, string(input.Category), string(input.Status),
		input.GithubURL, input.DemoURL, input.SortOrder,
	).Scan(&id)
	if err != nil { return nil, err }

	if len(input.Images) > 0 {
		for i, url := range input.Images {
			_, _ = r.db.Exec(ctx, "INSERT INTO lab_images (lab_id, url, sort_order) VALUES ($1, $2, $3)", id, url, i)
		}
	}

	return r.FindByID(id)
}

func (r *labRepository) Update(id string, input domain.UpdateLabInput) (*domain.Lab, error) {
	ctx := context.Background()
	sets := []string{"updated_at=NOW()"}
	args := []any{}
	i := 1

	if input.Title != nil       { sets = append(sets, fmt.Sprintf("title=$%d", i)); args = append(args, *input.Title); i++ }
	if input.Description != nil { sets = append(sets, fmt.Sprintf("description=$%d", i)); args = append(args, *input.Description); i++ }
	if input.Tags != nil        { sets = append(sets, fmt.Sprintf("tags=$%d", i)); args = append(args, input.Tags); i++ }
	if input.Category != nil    { sets = append(sets, fmt.Sprintf("category=$%d", i)); args = append(args, string(*input.Category)); i++ }
	if input.Status != nil      { sets = append(sets, fmt.Sprintf("status=$%d", i)); args = append(args, string(*input.Status)); i++ }
	if input.GithubURL != nil   { sets = append(sets, fmt.Sprintf("github_url=$%d", i)); args = append(args, *input.GithubURL); i++ }
	if input.DemoURL != nil     { sets = append(sets, fmt.Sprintf("demo_url=$%d", i)); args = append(args, *input.DemoURL); i++ }
	if input.SortOrder != nil   { sets = append(sets, fmt.Sprintf("sort_order=$%d", i)); args = append(args, *input.SortOrder); i++ }

	args = append(args, id)
	_, err := r.db.Exec(ctx, fmt.Sprintf("UPDATE labs SET %s WHERE id=$%d", strings.Join(sets, ","), i), args...)
	if err != nil { return nil, err }

	if input.Images != nil {
		_, _ = r.db.Exec(ctx, "DELETE FROM lab_images WHERE lab_id=$1", id)
		for idx, url := range *input.Images {
			_, _ = r.db.Exec(ctx, "INSERT INTO lab_images (lab_id, url, sort_order) VALUES ($1, $2, $3)", id, url, idx)
		}
	}

	return r.FindByID(id)
}

func (r *labRepository) Delete(id string) error {
	_, err := r.db.Exec(context.Background(), "DELETE FROM labs WHERE id=$1", id)
	return err
}
