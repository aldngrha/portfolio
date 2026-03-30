package middleware

import (
	"context"
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

			// If it's an SSR request from our server, we check for forwarded headers
			isSSR := strings.HasPrefix(ua, "Bun/") || strings.HasPrefix(ua, "node") || strings.Contains(ua, "undici")
			hasForwarded := false

			if isSSR {
				fua := r.Header.Get("X-Visitor-User-Agent")
				if fua != "" {
					ua = fua // Use the forwarded UA
					hasForwarded = true
				} else {
					// No forwarded UA, likely internal startup/heartbeat
					next.ServeHTTP(w, r)
					return
				}
			}

			// Skip for certain paths or methods (now AFTER we potentially replaced the UA)
			// BUT: If it's a forwarded SSR request, we WANT to log it if it's a public API call
			if !hasForwarded {
				if r.Method != http.MethodGet ||
				   strings.HasPrefix(r.URL.Path, "/api/v1/admin") ||
				   r.URL.Path == "/health" {
					next.ServeHTTP(w, r)
					return
				}
			} else {
				// For forwarded SSR, still skip admin and health
				if strings.HasPrefix(r.URL.Path, "/api/v1/admin") || r.URL.Path == "/health" {
					next.ServeHTTP(w, r)
					return
				}
			}

			ip := r.RemoteAddr
			if xff := r.Header.Get("X-Forwarded-For"); xff != "" {
				ip = xff
			}
			// Priority: X-Visitor-IP (set by our SSR)
			if xvip := r.Header.Get("X-Visitor-IP"); xvip != "" {
				ip = xvip
			}
			// Hash IP for privacy
			hash := sha256.Sum256([]byte(ip))
			ipHash := fmt.Sprintf("%x", hash)

			v := &domain.Visitor{
				Path:      r.URL.Path,
				Method:    r.Method,
				IPHash:    ipHash,
				UserAgent: ua,
				Referer:   r.Referer(),
			}

			// We don't want to block the request for visitor tracking
			go func() {
				err := repo.Create(context.Background(), v)
				if err != nil {
					slog.Error("failed to track visitor", "error", err)
				}
			}()

			next.ServeHTTP(w, r)
		})
	}
}
