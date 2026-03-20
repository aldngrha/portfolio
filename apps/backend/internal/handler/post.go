package handler

import (
	"net/http"

	"github.com/aldngrha/portfolio-backend/internal/domain"
	"github.com/go-chi/chi/v5"
)

type PostHandler struct {
	repo domain.PostRepository
}

func NewPostHandler(repo domain.PostRepository) *PostHandler {
	return &PostHandler{repo: repo}
}

func (h *PostHandler) List(w http.ResponseWriter, r *http.Request) {
	published := true
	filter := domain.PostFilter{
		Page:      queryInt(r, "page", 1),
		PerPage:   queryInt(r, "per_page", 10),
		Published: &published,
	}
	if cat := r.URL.Query().Get("category"); cat != "" {
		filter.Category = &cat
	}
	posts, total, err := h.repo.FindAll(filter)
	if err != nil { InternalError(w, err); return }
	Paginated(w, posts, total, filter.Page, filter.PerPage)
}

func (h *PostHandler) Get(w http.ResponseWriter, r *http.Request) {
	post, err := h.repo.FindBySlug(chi.URLParam(r, "slug"))
	if err != nil { InternalError(w, err); return }
	if post == nil { NotFound(w, "post not found"); return }
	Ok(w, post)
}

func (h *PostHandler) AdminList(w http.ResponseWriter, r *http.Request) {
	posts, total, err := h.repo.FindAll(domain.PostFilter{Page: 1, PerPage: 100})
	if err != nil { InternalError(w, err); return }
	Paginated(w, posts, total, 1, 100)
}

func (h *PostHandler) AdminCreate(w http.ResponseWriter, r *http.Request) {
	var input domain.CreatePostInput
	if err := Decode(r, &input); err != nil { BadRequest(w, "invalid body"); return }
	if input.Title == "" { BadRequest(w, "title is required"); return }
	post, err := h.repo.Create(input)
	if err != nil { InternalError(w, err); return }
	Created(w, post)
}

func (h *PostHandler) AdminUpdate(w http.ResponseWriter, r *http.Request) {
	var input domain.UpdatePostInput
	if err := Decode(r, &input); err != nil { BadRequest(w, "invalid body"); return }
	post, err := h.repo.Update(chi.URLParam(r, "id"), input)
	if err != nil { InternalError(w, err); return }
	if post == nil { NotFound(w, "post not found"); return }
	Ok(w, post)
}

func (h *PostHandler) AdminDelete(w http.ResponseWriter, r *http.Request) {
	if err := h.repo.Delete(chi.URLParam(r, "id")); err != nil { InternalError(w, err); return }
	NoContent(w)
}
