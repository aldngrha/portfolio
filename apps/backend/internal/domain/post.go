package domain

import "time"

type Post struct {
	ID          string    `json:"id"`
	Slug        string    `json:"slug"`
	Title       string    `json:"title"`
	Excerpt     string    `json:"excerpt"`
	Content     string    `json:"content"`
	Tags        []string  `json:"tags"`
	Category    string    `json:"category"`
	CoverURL    *string   `json:"cover_url"`
	ReadTime    int       `json:"read_time"`
	Published   bool      `json:"published"`
	PublishedAt *time.Time `json:"published_at"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

type CreatePostInput struct {
	Title     string   `json:"title"`
	Excerpt   string   `json:"excerpt"`
	Content   string   `json:"content"`
	Tags      []string `json:"tags"`
	Category  string   `json:"category"`
	CoverURL  *string  `json:"cover_url"`
	ReadTime  int      `json:"read_time"`
	Published bool     `json:"published"`
}

type UpdatePostInput struct {
	Title     *string  `json:"title"`
	Excerpt   *string  `json:"excerpt"`
	Content   *string  `json:"content"`
	Tags      []string `json:"tags"`
	Category  *string  `json:"category"`
	CoverURL  *string  `json:"cover_url"`
	ReadTime  *int     `json:"read_time"`
	Published *bool    `json:"published"`
}

type PostFilter struct {
	Category  *string
	Published *bool
	Page      int
	PerPage   int
}

type PostRepository interface {
	FindAll(filter PostFilter) ([]Post, int, error)
	FindBySlug(slug string) (*Post, error)
	FindByID(id string) (*Post, error)
	Create(input CreatePostInput) (*Post, error)
	Update(id string, input UpdatePostInput) (*Post, error)
	Delete(id string) error
}
