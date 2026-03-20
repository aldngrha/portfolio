package repository

import (
	"context"

	"github.com/aldngrha/portfolio-backend/internal/domain"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type contactRepository struct{ db *pgxpool.Pool }

func NewContactRepository(db *pgxpool.Pool) domain.ContactRepository {
	return &contactRepository{db: db}
}

func (r *contactRepository) FindAll(page, perPage int) ([]domain.ContactMessage, int, error) {
	ctx := context.Background()
	if page < 1 { page = 1 }
	if perPage < 1 { perPage = 20 }

	var total int
	r.db.QueryRow(ctx, "SELECT COUNT(*) FROM contact_messages").Scan(&total)

	rows, err := r.db.Query(ctx, `
		SELECT id,name,email,subject,message,read,created_at
		FROM contact_messages ORDER BY created_at DESC LIMIT $1 OFFSET $2`,
		perPage, (page-1)*perPage)
	if err != nil { return nil, 0, err }
	defer rows.Close()

	msgs := []domain.ContactMessage{}
	for rows.Next() {
		var m domain.ContactMessage
		if err := rows.Scan(&m.ID,&m.Name,&m.Email,&m.Subject,&m.Message,&m.Read,&m.CreatedAt); err != nil {
			return nil, 0, err
		}
		msgs = append(msgs, m)
	}
	return msgs, total, nil
}

func (r *contactRepository) FindByID(id string) (*domain.ContactMessage, error) {
	ctx := context.Background()
	var m domain.ContactMessage
	err := r.db.QueryRow(ctx, `SELECT id,name,email,subject,message,read,created_at FROM contact_messages WHERE id=$1`, id).
		Scan(&m.ID,&m.Name,&m.Email,&m.Subject,&m.Message,&m.Read,&m.CreatedAt)
	if err == pgx.ErrNoRows { return nil, nil }
	if err != nil { return nil, err }
	return &m, nil
}

func (r *contactRepository) Create(input domain.CreateContactInput) (*domain.ContactMessage, error) {
	ctx := context.Background()
	var id string
	err := r.db.QueryRow(ctx, `
		INSERT INTO contact_messages(name,email,subject,message)
		VALUES($1,$2,$3,$4) RETURNING id`,
		input.Name, input.Email, input.Subject, input.Message,
	).Scan(&id)
	if err != nil { return nil, err }
	return r.FindByID(id)
}

func (r *contactRepository) MarkRead(id string) error {
	_, err := r.db.Exec(context.Background(), "UPDATE contact_messages SET read=true WHERE id=$1", id)
	return err
}

func (r *contactRepository) Delete(id string) error {
	_, err := r.db.Exec(context.Background(), "DELETE FROM contact_messages WHERE id=$1", id)
	return err
}
