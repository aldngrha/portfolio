package main

import (
	"net/http"
	"strings"

	"github.com/aldngrha/portfolio-backend/internal/handler"
	"github.com/aldngrha/portfolio-backend/internal/middleware"
	"github.com/aldngrha/portfolio-backend/internal/repository"
	"github.com/go-chi/chi/v5"
	chimw "github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
)

func newRouter(
	workH    *handler.WorkHandler,
	labH     *handler.LabHandler,
	postH    *handler.PostHandler,
	contactH *handler.ContactHandler,
	authH    *handler.AuthHandler,
	uploadH  *handler.UploadHandler,
	statsH   *handler.StatsHandler,
	visitorH *handler.VisitorHandler,
	visitorRepo *repository.VisitorRepository,
	jwtSecret       string,
	allowedOrigins  string,
	) http.Handler {
	r := chi.NewRouter()

	// Global middleware
	r.Use(chimw.Recoverer)
	r.Use(chimw.StripSlashes)
	r.Use(middleware.Logger)
	r.Use(middleware.VisitorTracker(visitorRepo))
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   strings.Split(allowedOrigins, ","),
		AllowedMethods:   []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	// Health check
	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		handler.JSON(w, http.StatusOK, map[string]string{"status": "ok"})
	})

	r.Route("/api/v1", func(r chi.Router) {
		// ─── Public routes ───────────────────────────────────────
		r.Get("/works",              workH.List)
		r.Get("/works/{slug}",       workH.Get)
		r.Get("/labs",               labH.List)
		r.Get("/labs/{slug}",        labH.Get)
		r.Get("/posts",              postH.List)
		r.Get("/posts/{slug}",       postH.Get)

		r.With(middleware.RateLimit).Post("/contact", contactH.Send)

		// ─── Admin routes (JWT protected) ────────────────────────
		r.Post("/admin/auth/login", authH.Login)

		r.Group(func(r chi.Router) {
			r.Use(middleware.Auth(jwtSecret))

			// Stats
			r.Get("/admin/stats", statsH.GetStats)

			// Visitors
			r.Get("/admin/visitors", visitorH.AdminList)

			// Upload
			r.Post("/admin/upload", uploadH.Upload)
			// Works
			r.Get("/admin/works",           workH.AdminList)
			r.Post("/admin/works",          workH.AdminCreate)
			r.Put("/admin/works/{id}",      workH.AdminUpdate)
			r.Delete("/admin/works/{id}",   workH.AdminDelete)

			// Labs
			r.Get("/admin/labs",            labH.AdminList)
			r.Post("/admin/labs",           labH.AdminCreate)
			r.Put("/admin/labs/{id}",       labH.AdminUpdate)
			r.Delete("/admin/labs/{id}",    labH.AdminDelete)

			// Posts
			r.Get("/admin/posts",           postH.AdminList)
			r.Post("/admin/posts",          postH.AdminCreate)
			r.Put("/admin/posts/{id}",      postH.AdminUpdate)
			r.Delete("/admin/posts/{id}",   postH.AdminDelete)

			// Contact messages
			r.Get("/admin/messages",              contactH.AdminList)
			r.Patch("/admin/messages/{id}/read",  contactH.AdminMarkRead)
			r.Delete("/admin/messages/{id}",      contactH.AdminDelete)
		})
	})

	return r
}
