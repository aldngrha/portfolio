package main

import (
	"context"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	_ "github.com/joho/godotenv/autoload"

	"github.com/aldngrha/portfolio-backend/internal/config"
	"github.com/aldngrha/portfolio-backend/internal/database"
	"github.com/aldngrha/portfolio-backend/internal/handler"
	"github.com/aldngrha/portfolio-backend/internal/mailer"
	"github.com/aldngrha/portfolio-backend/internal/repository"
	"github.com/aldngrha/portfolio-backend/internal/storage"
)

func main() {
	// Logger
	slog.SetDefault(slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{
		Level: slog.LevelInfo,
	})))

	// Config
	cfg, err := config.Load()
	if err != nil {
		slog.Error("failed to load config", "error", err)
		os.Exit(1)
	}

	// Database
	db, err := database.New(cfg.DatabaseURL)
	if err != nil {
		slog.Error("failed to connect to database", "error", err)
		os.Exit(1)
	}
	defer db.Close()
	slog.Info("database connected")

	// Run migrations
	if err := runMigrations(db); err != nil {
		slog.Error("failed to run migrations", "error", err)
		os.Exit(1)
	}

	// Dependencies
	storageClient := storage.NewClient(cfg.SupabaseURL, cfg.SupabaseServiceKey, cfg.SupabaseBucket)
	mailClient    := mailer.New(cfg.ResendAPIKey, cfg.EmailFrom, cfg.EmailTo)

	// Repositories
	workRepo    := repository.NewWorkRepository(db)
	labRepo     := repository.NewLabRepository(db)
	postRepo    := repository.NewPostRepository(db)
	contactRepo := repository.NewContactRepository(db)
	visitorRepo := repository.NewVisitorRepository(db)

	// Handlers
	workH    := handler.NewWorkHandler(workRepo, storageClient)
	labH     := handler.NewLabHandler(labRepo)
	postH    := handler.NewPostHandler(postRepo)
	contactH := handler.NewContactHandler(contactRepo, mailClient)
	authH    := handler.NewAuthHandler(cfg)
	uploadH  := handler.NewUploadHandler(storageClient)
	statsH   := handler.NewStatsHandler(visitorRepo, workRepo, labRepo, postRepo, contactRepo)

	// Router
	router := newRouter(workH, labH, postH, contactH, authH, uploadH, statsH, visitorRepo, cfg.JWTSecret, cfg.AllowedOrigins)

	// Server
	srv := &http.Server{
		Addr:         fmt.Sprintf(":%s", cfg.Port),
		Handler:      router,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 30 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	// Graceful shutdown
	done := make(chan struct{})
	go func() {
		quit := make(chan os.Signal, 1)
		signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
		<-quit

		slog.Info("shutting down server...")
		ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
		defer cancel()

		if err := srv.Shutdown(ctx); err != nil {
			slog.Error("server forced to shutdown", "error", err)
		}
		close(done)
	}()

	slog.Info("server starting", "port", cfg.Port, "env", cfg.Env)
	if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		slog.Error("server error", "error", err)
		os.Exit(1)
	}

	<-done
	slog.Info("server stopped")
}
