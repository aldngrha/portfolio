package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/aldngrha/portfolio-backend/internal/database"
	"github.com/aldngrha/portfolio-backend/internal/repository"
	_ "github.com/joho/godotenv/autoload"
)

func main() {
	dbURL := os.Getenv("DATABASE_URL")
	db, err := database.New(dbURL)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	repo := repository.NewVisitorRepository(db)
	visitors, _, err := repo.FindAll(context.Background(), 1, 5)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("--- Last 5 Visitors (Current Server Time: %s) ---\n", time.Now().Format(time.RFC3339))
	for _, v := range visitors {
		fmt.Printf("[%s] Path: %s | UA: %s | IP: %s\n",
			v.CreatedAt.Format(time.RFC1123), v.Path, v.UserAgent, v.IPHash[:8])
	}
}
