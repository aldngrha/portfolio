package middleware

import (
	"net/http"
	"sync"
	"time"

	"github.com/aldngrha/portfolio-backend/internal/handler"
)

type client struct {
	lastSeen time.Time
	count    int
}

var (
	clients = make(map[string]*client)
	mu      sync.Mutex
)

func RateLimit(next http.Handler) http.Handler {
	// Cleanup routine
	go func() {
		for {
			time.Sleep(time.Minute)
			mu.Lock()
			for ip, c := range clients {
				if time.Since(c.lastSeen) > time.Hour {
					delete(clients, ip)
				}
			}
			mu.Unlock()
		}
	}()

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ip := r.RemoteAddr
		// If behind a proxy, use X-Forwarded-For
		if xff := r.Header.Get("X-Forwarded-For"); xff != "" {
			ip = xff
		}

		mu.Lock()
		c, ok := clients[ip]
		if !ok {
			c = &client{lastSeen: time.Now(), count: 1}
			clients[ip] = c
			mu.Unlock()
			next.ServeHTTP(w, r)
			return
		}

		// Reset if last seen was more than an hour ago
		if time.Since(c.lastSeen) > time.Hour {
			c.count = 0
		}

		c.lastSeen = time.Now()
		c.count++

		// Limit: 5 requests per hour for contact form
		if c.count > 5 {
			mu.Unlock()
			handler.JSON(w, http.StatusTooManyRequests, map[string]string{
				"error": "Too many requests. Please try again in an hour.",
			})
			return
		}

		mu.Unlock()
		next.ServeHTTP(w, r)
	})
}
