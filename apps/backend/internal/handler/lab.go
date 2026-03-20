package handler

import (
	"net/http"

	"github.com/aldngrha/portfolio-backend/internal/domain"
	"github.com/go-chi/chi/v5"
)

type LabHandler struct {
	repo domain.LabRepository
}

func NewLabHandler(repo domain.LabRepository) *LabHandler {
	return &LabHandler{repo: repo}
}

func (h *LabHandler) List(w http.ResponseWriter, r *http.Request) {
	filter := domain.LabFilter{
		Page:    queryInt(r, "page", 1),
		PerPage: queryInt(r, "per_page", 20),
	}
	if cat := r.URL.Query().Get("category"); cat != "" {
		c := domain.LabCategory(cat)
		filter.Category = &c
	}
	labs, total, err := h.repo.FindAll(filter)
	if err != nil { InternalError(w, err); return }
	Paginated(w, labs, total, filter.Page, filter.PerPage)
}

func (h *LabHandler) Get(w http.ResponseWriter, r *http.Request) {
	lab, err := h.repo.FindBySlug(chi.URLParam(r, "slug"))
	if err != nil { InternalError(w, err); return }
	if lab == nil { NotFound(w, "lab not found"); return }
	Ok(w, lab)
}

func (h *LabHandler) AdminList(w http.ResponseWriter, r *http.Request) {
	labs, total, err := h.repo.FindAll(domain.LabFilter{Page: 1, PerPage: 100})
	if err != nil { InternalError(w, err); return }
	Paginated(w, labs, total, 1, 100)
}

func (h *LabHandler) AdminCreate(w http.ResponseWriter, r *http.Request) {
	var input domain.CreateLabInput
	if err := Decode(r, &input); err != nil { BadRequest(w, "invalid body"); return }
	if input.Title == "" { BadRequest(w, "title is required"); return }
	lab, err := h.repo.Create(input)
	if err != nil { InternalError(w, err); return }
	Created(w, lab)
}

func (h *LabHandler) AdminUpdate(w http.ResponseWriter, r *http.Request) {
	var input domain.UpdateLabInput
	if err := Decode(r, &input); err != nil { BadRequest(w, "invalid body"); return }
	lab, err := h.repo.Update(chi.URLParam(r, "id"), input)
	if err != nil { InternalError(w, err); return }
	if lab == nil { NotFound(w, "lab not found"); return }
	Ok(w, lab)
}

func (h *LabHandler) AdminDelete(w http.ResponseWriter, r *http.Request) {
	if err := h.repo.Delete(chi.URLParam(r, "id")); err != nil { InternalError(w, err); return }
	NoContent(w)
}
