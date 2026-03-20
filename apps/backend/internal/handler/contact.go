package handler

import (
	"net/http"
	"regexp"

	"github.com/aldngrha/portfolio-backend/internal/domain"
	"github.com/aldngrha/portfolio-backend/internal/mailer"
	"github.com/go-chi/chi/v5"
)

var emailRe = regexp.MustCompile(`^[^\s@]+@[^\s@]+\.[^\s@]+$`)

type ContactHandler struct {
	repo   domain.ContactRepository
	mailer *mailer.Mailer
}

func NewContactHandler(repo domain.ContactRepository, m *mailer.Mailer) *ContactHandler {
	return &ContactHandler{repo: repo, mailer: m}
}

func (h *ContactHandler) Send(w http.ResponseWriter, r *http.Request) {
	var input domain.CreateContactInput
	if err := Decode(r, &input); err != nil {
		BadRequest(w, "invalid request body")
		return
	}

	if input.Name == "" || input.Email == "" || input.Subject == "" || input.Message == "" {
		BadRequest(w, "all fields are required")
		return
	}
	if !emailRe.MatchString(input.Email) {
		BadRequest(w, "invalid email address")
		return
	}

	msg, err := h.repo.Create(input)
	if err != nil {
		InternalError(w, err)
		return
	}

	// Send email notification (non-blocking)
	go h.mailer.SendContactNotification(input.Name, input.Email, input.Subject, input.Message)

	Created(w, map[string]string{"id": msg.ID})
}

// Admin handlers
func (h *ContactHandler) AdminList(w http.ResponseWriter, r *http.Request) {
	page    := queryInt(r, "page", 1)
	perPage := queryInt(r, "per_page", 20)
	msgs, total, err := h.repo.FindAll(page, perPage)
	if err != nil { InternalError(w, err); return }
	Paginated(w, msgs, total, page, perPage)
}

func (h *ContactHandler) AdminMarkRead(w http.ResponseWriter, r *http.Request) {
	if err := h.repo.MarkRead(chi.URLParam(r, "id")); err != nil {
		InternalError(w, err)
		return
	}
	NoContent(w)
}

func (h *ContactHandler) AdminDelete(w http.ResponseWriter, r *http.Request) {
	if err := h.repo.Delete(chi.URLParam(r, "id")); err != nil {
		InternalError(w, err)
		return
	}
	NoContent(w)
}
