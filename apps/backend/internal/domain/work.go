package domain

import (
	"context"
	"time"
)

type WorkStatus   string
type WorkCategory string

const (
	WorkStatusLive     WorkStatus = "live"
	WorkStatusWIP      WorkStatus = "wip"
	WorkStatusArchived WorkStatus = "archived"

	WorkCategoryWebApp     WorkCategory = "web_app"
	WorkCategoryBlockchain WorkCategory = "blockchain"
	WorkCategoryMobile     WorkCategory = "mobile"
	WorkCategoryOpenSource WorkCategory = "open_source"
	WorkCategoryOther      WorkCategory = "other"
)

type Work struct {
	ID           string       `json:"id"`
	Slug         string       `json:"slug"`
	Title        string       `json:"title"`
	Tagline      string       `json:"tagline"`
	Description  string       `json:"description"`
	ThumbnailURL *string      `json:"thumbnail_url"`
	Images       []WorkImage  `json:"images"`
	Tags         []string     `json:"tags"`
	TechStack    []string     `json:"tech_stack"`
	Category     WorkCategory `json:"category"`
	Status       WorkStatus   `json:"status"`
	LiveURL      *string      `json:"live_url"`
	GithubURL    *string      `json:"github_url"`
	Year         int          `json:"year"`
	Role         string       `json:"role"`
	Featured     bool         `json:"featured"`
	SortOrder    int          `json:"sort_order"`
	CreatedAt    time.Time    `json:"created_at"`
	UpdatedAt    time.Time    `json:"updated_at"`
}

type WorkImage struct {
	ID        string  `json:"id"`
	WorkID    string  `json:"work_id"`
	URL       string  `json:"url"`
	Caption   *string `json:"caption"`
	SortOrder int     `json:"sort_order"`
}

type CreateWorkInput struct {
	Title        string       `json:"title"`
	Tagline      string       `json:"tagline"`
	Description  string       `json:"description"`
	ThumbnailURL *string      `json:"thumbnail_url"`
	Images       []string     `json:"images"`
	Tags         []string     `json:"tags"`
	TechStack    []string     `json:"tech_stack"`
	Category     WorkCategory `json:"category"`
	Status       WorkStatus   `json:"status"`
	LiveURL      *string      `json:"live_url"`
	GithubURL    *string      `json:"github_url"`
	Year         int          `json:"year"`
	Role         string       `json:"role"`
	Featured     bool         `json:"featured"`
	SortOrder    int          `json:"sort_order"`
}

type UpdateWorkInput struct {
	Title        *string      `json:"title"`
	Tagline      *string      `json:"tagline"`
	Description  *string      `json:"description"`
	ThumbnailURL *string      `json:"thumbnail_url"`
	Images       *[]string    `json:"images"`
	Tags         []string     `json:"tags"`
	TechStack    []string     `json:"tech_stack"`
	Category     *WorkCategory `json:"category"`
	Status       *WorkStatus  `json:"status"`
	LiveURL      *string      `json:"live_url"`
	GithubURL    *string      `json:"github_url"`
	Year         *int         `json:"year"`
	Role         *string      `json:"role"`
	Featured     *bool        `json:"featured"`
	SortOrder    *int         `json:"sort_order"`
}

type WorkFilter struct {
	Category *WorkCategory
	Featured *bool
	Page     int
	PerPage  int
}

type WorkRepository interface {
	FindAll(filter WorkFilter) ([]Work, int, error)
	FindBySlug(slug string) (*Work, error)
	FindByID(id string) (*Work, error)
	Create(input CreateWorkInput) (*Work, error)
	Update(id string, input UpdateWorkInput) (*Work, error)
	Delete(id string) error
	Count(ctx context.Context) (int, error)
}
