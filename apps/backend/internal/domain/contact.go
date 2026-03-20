package domain

import "time"

type ContactMessage struct {
	ID        string    `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Subject   string    `json:"subject"`
	Message   string    `json:"message"`
	Read      bool      `json:"read"`
	CreatedAt time.Time `json:"created_at"`
}

type CreateContactInput struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Subject string `json:"subject"`
	Message string `json:"message"`
}

type ContactRepository interface {
	FindAll(page, perPage int) ([]ContactMessage, int, error)
	FindByID(id string) (*ContactMessage, error)
	Create(input CreateContactInput) (*ContactMessage, error)
	MarkRead(id string) error
	Delete(id string) error
}
