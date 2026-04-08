package middleware

import (
	"context"
	"crypto/sha256"
	"fmt"
	"log/slog"
	"net"
	"net/http"
	"strings"

	"github.com/aldngrha/portfolio-backend/internal/domain"
	"github.com/aldngrha/portfolio-backend/internal/repository"
)

func VisitorTracker(repo *repository.VisitorRepository) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			ua := r.UserAgent()

			// 1. Handle identity (SSR vs Client)
			fua := r.Header.Get("X-Visitor-User-Agent")
			isInternal := strings.HasPrefix(ua, "Bun/") || strings.HasPrefix(ua, "node") || strings.Contains(ua, "undici")

			if fua != "" {
				ua = fua
			} else if isInternal {
				next.ServeHTTP(w, r)
				return
			}

			// 2. Skip logic for paths/methods
			if r.Method != http.MethodGet ||
			   strings.HasPrefix(r.URL.Path, "/api/v1/admin") ||
			   r.URL.Path == "/health" {
				next.ServeHTTP(w, r)
				return
			}

			// 3. Robust IP Detection
			var ip string

			// Priority 1: Custom header from our SSR
			if xvip := r.Header.Get("X-Visitor-IP"); xvip != "" {
				ip = xvip
			} else {
				// Priority 2: Standard Proxy Headers
				headers := []string{"CF-Connecting-IP", "X-Real-IP", "X-Forwarded-For"}
				for _, h := range headers {
					val := r.Header.Get(h)
					if val != "" {
						// X-Forwarded-For bisa berisi multiple IP (comma separated), ambil yang pertama
						if h == "X-Forwarded-For" {
							ips := strings.Split(val, ",")
							ip = strings.TrimSpace(ips[0])
						} else {
							ip = val
						}
						break
					}
				}
			}

			// Priority 3: Fallback to RemoteAddr if no headers found
			if ip == "" {
				host, _, err := net.SplitHostPort(r.RemoteAddr)
				if err == nil {
					ip = host
				} else {
					ip = r.RemoteAddr
				}
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
