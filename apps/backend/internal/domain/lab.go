package domain

import (
	"context"
	"time"
)

type LabStatus   string
type LabCategory string

const (
	LabStatusDone      LabStatus = "done"
	LabStatusWIP       LabStatus = "wip"
	LabStatusAbandoned LabStatus = "abandoned"

	LabCategoryBlockchain LabCategory = "blockchain"
	LabCategoryWeb        LabCategory = "web"
	LabCategoryCLI        LabCategory = "cli"
	LabCategoryOther      LabCategory = "other"
)

type LabImage struct {
	ID        string  `json:"id"`
	LabID     string  `json:"lab_id"`
	URL       string  `json:"url"`
	Caption   *string `json:"caption"`
	SortOrder int     `json:"sort_order"`
}

type Lab struct {
	ID          string      `json:"id"`
	Slug        string      `json:"slug"`
	Title       string      `json:"title"`
	Description string      `json:"description"`
	Tags        []string    `json:"tags"`
	Category    LabCategory `json:"category"`
	Status      LabStatus   `json:"status"`
	GithubURL   *string     `json:"github_url"`
	DemoURL     *string     `json:"demo_url"`
	Images      []LabImage  `json:"images"`
	SortOrder   int         `json:"sort_order"`
	CreatedAt   time.Time   `json:"created_at"`
	UpdatedAt   time.Time   `json:"updated_at"`
}

type CreateLabInput struct {
	Title       string      `json:"title"`
	Description string      `json:"description"`
	Tags        []string    `json:"tags"`
	Category    LabCategory `json:"category"`
	Status      LabStatus   `json:"status"`
	GithubURL   *string     `json:"github_url"`
	DemoURL     *string     `json:"demo_url"`
	Images      []string    `json:"images"`
	SortOrder   int         `json:"sort_order"`
}

type UpdateLabInput struct {
	Title       *string      `json:"title"`
	Description *string      `json:"description"`
	Tags        []string     `json:"tags"`
	Category    *LabCategory `json:"category"`
	Status      *LabStatus   `json:"status"`
	GithubURL   *string      `json:"github_url"`
	DemoURL     *string      `json:"demo_url"`
	Images      *[]string    `json:"images"`
	SortOrder   *int         `json:"sort_order"`
}

type LabFilter struct {
	Category *LabCategory
	Page     int
	PerPage  int
}

type LabRepository interface {
	FindAll(filter LabFilter) ([]Lab, int, error)
	FindBySlug(slug string) (*Lab, error)
	FindByID(id string) (*Lab, error)
	Create(input CreateLabInput) (*Lab, error)
	Update(id string, input UpdateLabInput) (*Lab, error)
	Delete(id string) error
	Count(ctx context.Context) (int, error)
}
