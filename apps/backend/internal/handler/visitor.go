package handler

import (
	"net/http"

	"github.com/aldngrha/portfolio-backend/internal/repository"
)

type VisitorHandler struct {
	repo *repository.VisitorRepository
}

func NewVisitorHandler(repo *repository.VisitorRepository) *VisitorHandler {
	return &VisitorHandler{repo: repo}
}

func (h *VisitorHandler) AdminList(w http.ResponseWriter, r *http.Request) {
	page    := queryInt(r, "page", 1)
	perPage := queryInt(r, "per_page", 20)

	visitors, total, err := h.repo.FindAll(r.Context(), page, perPage)
	if err != nil {
		InternalError(w, err)
		return
	}

	Paginated(w, visitors, total, page, perPage)
}
