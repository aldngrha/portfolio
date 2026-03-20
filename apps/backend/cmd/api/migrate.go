package main

import (
	"context"
	"fmt"
	"log/slog"
	"os"
	"path/filepath"
	"sort"
	"strings"

	"github.com/jackc/pgx/v5/pgxpool"
)

func runMigrations(db *pgxpool.Pool) error {
	ctx := context.Background()

	// Create migrations table if not exists
	_, err := db.Exec(ctx, `
		CREATE TABLE IF NOT EXISTS schema_migrations (
			version TEXT PRIMARY KEY,
			applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
		)`)
	if err != nil {
		return fmt.Errorf("create migrations table: %w", err)
	}

	// Read migration files
	entries, err := os.ReadDir("migrations")
	if err != nil {
		slog.Warn("no migrations directory found, skipping")
		return nil
	}

	files := []string{}
	for _, e := range entries {
		if !e.IsDir() && strings.HasSuffix(e.Name(), ".sql") {
			files = append(files, e.Name())
		}
	}
	sort.Strings(files)

	for _, file := range files {
		version := strings.TrimSuffix(file, ".sql")

		// Check if already applied
		var applied bool
		db.QueryRow(ctx, "SELECT EXISTS(SELECT 1 FROM schema_migrations WHERE version=$1)", version).Scan(&applied)
		if applied {
			continue
		}

		// Read and execute
		content, err := os.ReadFile(filepath.Join("migrations", file))
		if err != nil {
			return fmt.Errorf("read migration %s: %w", file, err)
		}

		if _, err := db.Exec(ctx, string(content)); err != nil {
			return fmt.Errorf("execute migration %s: %w", file, err)
		}

		db.Exec(ctx, "INSERT INTO schema_migrations(version) VALUES($1)", version)
		slog.Info("migration applied", "version", version)
	}

	return nil
}
