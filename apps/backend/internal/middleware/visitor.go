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

			// DEBUG LOG (Temporary)
			slog.Info("visitor-tracker-start",
				"method", r.Method,
				"path", r.URL.Path,
				"ua", ua,
				"fua", r.Header.Get("X-Visitor-User-Agent"),
				"fip", r.Header.Get("X-Visitor-IP"))

			// 1. Handle identity (SSR vs Client)
			// Priority 1: X-Visitor-User-Agent (set by our SvelteKit SSR)
			fua := r.Header.Get("X-Visitor-User-Agent")
			isInternal := strings.HasPrefix(ua, "Bun/") || strings.HasPrefix(ua, "node") || strings.Contains(ua, "undici")

			if fua != "" {
				ua = fua
				slog.Info("visitor-tracker-ua-forwarded", "ua", ua)
			} else if isInternal {
				// It's a request from our server WITHOUT a forwarded UA
				// (e.g., startup checks, cron jobs, etc.) - Skip logging
				slog.Info("visitor-tracker-skip-internal", "ua", ua)
				next.ServeHTTP(w, r)
				return
			}

			// 2. Skip logic for paths/methods
			// We only want to log public GET requests
			if r.Method != http.MethodGet ||
			   strings.HasPrefix(r.URL.Path, "/api/v1/admin") ||
			   r.URL.Path == "/health" {
				slog.Info("visitor-tracker-skip-path", "method", r.Method, "path", r.URL.Path)
				next.ServeHTTP(w, r)
				return
			}

			// 3. Handle IP (Priority: Forwarded IP from SSR > X-Forwarded-For > RemoteAddr)
			ip := r.RemoteAddr
			if xff := r.Header.Get("X-Forwarded-For"); xff != "" {
				ip = xff
			}
			if xvip := r.Header.Get("X-Visitor-IP"); xvip != "" {
				ip = xvip
			}

			slog.Info("visitor-tracker-logging", "path", r.URL.Path, "ua", ua, "ip", ip)

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
