package repository

import (
	"context"
	"fmt"
	"strings"
	"time"

	"github.com/aldngrha/portfolio-backend/internal/domain"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type postRepository struct{ db *pgxpool.Pool }

func NewPostRepository(db *pgxpool.Pool) domain.PostRepository {
	return &postRepository{db: db}
}

func (r *postRepository) FindAll(filter domain.PostFilter) ([]domain.Post, int, error) {
	ctx := context.Background()
	where := []string{"1=1"}
	args := []any{}
	i := 1

	if filter.Published != nil {
		where = append(where, fmt.Sprintf("published=$%d", i))
		args = append(args, *filter.Published)
		i++
	}
	if filter.Category != nil {
		where = append(where, fmt.Sprintf("category=$%d", i))
		args = append(args, *filter.Category)
		i++
	}

	whereClause := strings.Join(where, " AND ")
	var total int
	r.db.QueryRow(ctx, fmt.Sprintf("SELECT COUNT(*) FROM posts WHERE %s", whereClause), args...).Scan(&total)

	page := filter.Page; if page < 1 { page = 1 }
	perPage := filter.PerPage; if perPage < 1 { perPage = 10 }
	args = append(args, perPage, (page-1)*perPage)

	rows, err := r.db.Query(ctx, fmt.Sprintf(`
		SELECT id,slug,title,excerpt,content,tags,category,cover_url,read_time,published,published_at,created_at,updated_at
		FROM posts WHERE %s ORDER BY published_at DESC NULLS LAST, created_at DESC LIMIT $%d OFFSET $%d`,
		whereClause, i, i+1), args...)
	if err != nil { return nil, 0, err }
	defer rows.Close()

	posts := []domain.Post{}
	for rows.Next() {
		p, err := scanPost(rows)
		if err != nil { return nil, 0, err }
		posts = append(posts, *p)
	}
	return posts, total, nil
}

func (r *postRepository) FindBySlug(slug string) (*domain.Post, error) {
	ctx := context.Background()
	row := r.db.QueryRow(ctx, `SELECT id,slug,title,excerpt,content,tags,category,cover_url,read_time,published,published_at,created_at,updated_at FROM posts WHERE slug=$1 AND published=true`, slug)
	p, err := scanPost(row)
	if err == pgx.ErrNoRows { return nil, nil }
	if err != nil { return nil, err }
	return p, nil
}

func (r *postRepository) FindByID(id string) (*domain.Post, error) {
	ctx := context.Background()
	row := r.db.QueryRow(ctx, `SELECT id,slug,title,excerpt,content,tags,category,cover_url,read_time,published,published_at,created_at,updated_at FROM posts WHERE id=$1`, id)
	p, err := scanPost(row)
	if err == pgx.ErrNoRows { return nil, nil }
	if err != nil { return nil, err }
	return p, nil
}

func (r *postRepository) Create(input domain.CreatePostInput) (*domain.Post, error) {
	ctx := context.Background()
	slug := generateSlug(input.Title)
	var publishedAt *time.Time
	if input.Published {
		now := time.Now()
		publishedAt = &now
	}
	var id string
	err := r.db.QueryRow(ctx, `
		INSERT INTO posts(slug,title,excerpt,content,tags,category,cover_url,read_time,published,published_at)
		VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id`,
		slug, input.Title, input.Excerpt, input.Content, input.Tags, input.Category,
		input.CoverURL, input.ReadTime, input.Published, publishedAt,
	).Scan(&id)
	if err != nil { return nil, err }
	return r.FindByID(id)
}

func (r *postRepository) Update(id string, input domain.UpdatePostInput) (*domain.Post, error) {
	ctx := context.Background()
	sets := []string{"updated_at=NOW()"}
	args := []any{}
	i := 1

	if input.Title != nil     { sets = append(sets, fmt.Sprintf("title=$%d", i)); args = append(args, *input.Title); i++ }
	if input.Excerpt != nil   { sets = append(sets, fmt.Sprintf("excerpt=$%d", i)); args = append(args, *input.Excerpt); i++ }
	if input.Content != nil   { sets = append(sets, fmt.Sprintf("content=$%d", i)); args = append(args, *input.Content); i++ }
	if input.Tags != nil      { sets = append(sets, fmt.Sprintf("tags=$%d", i)); args = append(args, input.Tags); i++ }
	if input.Category != nil  { sets = append(sets, fmt.Sprintf("category=$%d", i)); args = append(args, *input.Category); i++ }
	if input.CoverURL != nil  { sets = append(sets, fmt.Sprintf("cover_url=$%d", i)); args = append(args, *input.CoverURL); i++ }
	if input.ReadTime != nil  { sets = append(sets, fmt.Sprintf("read_time=$%d", i)); args = append(args, *input.ReadTime); i++ }
	if input.Published != nil {
		sets = append(sets, fmt.Sprintf("published=$%d", i)); args = append(args, *input.Published); i++
		if *input.Published {
			sets = append(sets, fmt.Sprintf("published_at=COALESCE(published_at, $%d)", i))
			args = append(args, time.Now()); i++
		}
	}

	args = append(args, id)
	_, err := r.db.Exec(ctx, fmt.Sprintf("UPDATE posts SET %s WHERE id=$%d", strings.Join(sets, ","), i), args...)
	if err != nil { return nil, err }
	return r.FindByID(id)
}

func (r *postRepository) Delete(id string) error {
	_, err := r.db.Exec(context.Background(), "DELETE FROM posts WHERE id=$1", id)
	return err
}

func scanPost(row scanner) (*domain.Post, error) {
	var p domain.Post
	err := row.Scan(&p.ID, &p.Slug, &p.Title, &p.Excerpt, &p.Content, &p.Tags, &p.Category,
		&p.CoverURL, &p.ReadTime, &p.Published, &p.PublishedAt, &p.CreatedAt, &p.UpdatedAt)
	return &p, err
}
