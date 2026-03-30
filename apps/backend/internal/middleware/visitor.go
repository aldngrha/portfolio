package middleware

import (
	"crypto/sha256"
	"fmt"
	"log/slog"
	"net/http"
	"strings"

	"github.com/aldngrha/portfolio-backend/internal/domain"
	"github.com/aldngrha/portfolio-backend/internal/repository"
)

func VisitorTracker(repo *repository.VisitorRepository) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			ua := r.UserAgent()

			// Skip for certain paths or methods
			if r.Method != http.MethodGet ||
			   strings.HasPrefix(r.URL.Path, "/api/v1/admin") ||
			   r.URL.Path == "/health" ||
			   // SKIP INTERNAL SSR REQUESTS
			   strings.HasPrefix(ua, "Bun/") ||
			   strings.HasPrefix(ua, "node") ||
			   strings.Contains(ua, "undici") {
				next.ServeHTTP(w, r)
				return
			}
			ip := r.RemoteAddr
			if xff := r.Header.Get("X-Forwarded-For"); xff != "" {
				ip = xff
			}

			// Hash IP for privacy
			hash := sha256.Sum256([]byte(ip))
			ipHash := fmt.Sprintf("%x", hash)

			v := &domain.Visitor{
				Path:      r.URL.Path,
				Method:    r.Method,
				IPHash:    ipHash,
				UserAgent: r.UserAgent(),
				Referer:   r.Referer(),
			}

			// We don't want to block the request for visitor tracking
			go func() {
				err := repo.Create(r.Context(), v)
				if err != nil {
					slog.Error("failed to track visitor", "error", err)
				}
			}()

			next.ServeHTTP(w, r)
		})
	}
}
