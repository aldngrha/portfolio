package handler

import (
	"net/http"

	"github.com/aldngrha/portfolio-backend/internal/storage"
)

type UploadHandler struct {
	storage *storage.Client
}

func NewUploadHandler(s *storage.Client) *UploadHandler {
	return &UploadHandler{storage: s}
}

func (h *UploadHandler) Upload(w http.ResponseWriter, r *http.Request) {
	err := r.ParseMultipartForm(2 << 20) // 2MB limit
	if err != nil {
      BadRequest(w, "file too large (max 2MB)")
      return
    }

	file, header, err := r.FormFile("file")
	if err != nil {
		BadRequest(w, "file is required")
		return
	}
	defer file.Close()

	contentType := header.Header.Get("Content-Type")
  allowedTypes := map[string]bool{
      "image/jpeg":      true,
      "image/png":       true,
      "image/webp":      true,
      "application/pdf": true,
  }
  if !allowedTypes[contentType] {
      BadRequest(w, "file type not allowed")
      return
  }

	bucket := r.FormValue("bucket")
	if bucket == "" {
		bucket = "works"
	}

	// Validate bucket name
	allowed := map[string]bool{"works":   true,
    "resume":  true,
    "profile": true,
    "labs":    true,
    "writing": true,
	}
	if !allowed[bucket] {
		BadRequest(w, "invalid bucket/folder destination")
		return
	}

	result, err := h.storage.Upload(file, header, bucket)
	if err != nil {
		InternalError(w, err)
		return
	}

	Ok(w, map[string]string{"url": result.URL})
}
