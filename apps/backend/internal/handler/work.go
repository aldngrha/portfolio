package handler

import (
	"log/slog"
	"net/http"
	"strconv"

	"github.com/aldngrha/portfolio-backend/internal/domain"
	"github.com/aldngrha/portfolio-backend/internal/storage"
	"github.com/go-chi/chi/v5"
)

type WorkHandler struct {
	repo    domain.WorkRepository
	storage *storage.Client
}

func NewWorkHandler(repo domain.WorkRepository, storage *storage.Client) *WorkHandler {
	return &WorkHandler{repo: repo, storage: storage}
}

// ─── Public ──────────────────────────────────────────────────────────────────

func (h *WorkHandler) List(w http.ResponseWriter, r *http.Request) {
	filter := domain.WorkFilter{
		Page:    queryInt(r, "page", 1),
		PerPage: queryInt(r, "per_page", 20),
	}

	if cat := r.URL.Query().Get("category"); cat != "" {
		c := domain.WorkCategory(cat)
		filter.Category = &c
	}
	if feat := r.URL.Query().Get("featured"); feat == "true" {
		t := true
		filter.Featured = &t
	}

	works, total, err := h.repo.FindAll(filter)
	if err != nil {
		InternalError(w, err)
		return
	}
	Paginated(w, works, total, filter.Page, filter.PerPage)
}

func (h *WorkHandler) Get(w http.ResponseWriter, r *http.Request) {
	slug := chi.URLParam(r, "slug")
	work, err := h.repo.FindBySlug(slug)
	if err != nil {
		InternalError(w, err)
		return
	}
	if work == nil {
		NotFound(w, "work not found")
		return
	}
	Ok(w, work)
}

// ─── Admin ───────────────────────────────────────────────────────────────────

func (h *WorkHandler) AdminList(w http.ResponseWriter, r *http.Request) {
	filter := domain.WorkFilter{
		Page:    queryInt(r, "page", 1),
		PerPage: queryInt(r, "per_page", 50),
	}
	works, total, err := h.repo.FindAll(filter)
	if err != nil {
		InternalError(w, err)
		return
	}
	Paginated(w, works, total, filter.Page, filter.PerPage)
}

func (h *WorkHandler) AdminCreate(w http.ResponseWriter, r *http.Request) {
	var input domain.CreateWorkInput
	if err := Decode(r, &input); err != nil {
		BadRequest(w, "invalid request body")
		return
	}
	if input.Title == "" {
		BadRequest(w, "title is required")
		return
	}

	work, err := h.repo.Create(input)
	if err != nil {
		InternalError(w, err)
		return
	}
	Created(w, work)
}

func (h *WorkHandler) AdminUpdate(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")

	var input domain.UpdateWorkInput
	if err := Decode(r, &input); err != nil {
		BadRequest(w, "invalid request body")
		return
	}

	work, err := h.repo.Update(id, input)
	if err != nil {
		InternalError(w, err)
		return
	}
	if work == nil {
		NotFound(w, "work not found")
		return
	}
	Ok(w, work)
}

func (h *WorkHandler) AdminDelete(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	if err := h.repo.Delete(id); err != nil {
		InternalError(w, err)
		return
	}
	NoContent(w)
}

func (h *WorkHandler) AdminUpload(w http.ResponseWriter, r *http.Request) {
	err := r.ParseMultipartForm(10 << 20)
    if err != nil {
        slog.Error("failed to parse multipart", "err", err) // <--- Tambahkan log ini
        BadRequest(w, "invalid form")
        return
    }

    file, header, err := r.FormFile("file")
    if err != nil {
        slog.Error("failed to get file", "err", err) // <--- Tambahkan log ini
        BadRequest(w, "file is required")
        return
    }
    defer file.Close()

	folder := r.FormValue("folder")
	if folder == "" {
		folder = "works"
	}

	result, err := h.storage.Upload(file, header, folder)
	if err != nil {
		InternalError(w, err)
		return
	}
	Ok(w, result)
}

func queryInt(r *http.Request, key string, def int) int {
	v := r.URL.Query().Get(key)
	if v == "" {
		return def
	}
	i, err := strconv.Atoi(v)
	if err != nil {
		return def
	}
	return i
}
