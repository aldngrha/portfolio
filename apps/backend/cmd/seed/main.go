package main

import (
	"context"
	"log/slog"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
	_ "github.com/joho/godotenv/autoload"
	"golang.org/x/crypto/bcrypt"

	"github.com/aldngrha/portfolio-backend/internal/config"
	"github.com/aldngrha/portfolio-backend/internal/database"
	"github.com/aldngrha/portfolio-backend/internal/domain"
	"github.com/aldngrha/portfolio-backend/internal/repository"
)

func main() {
	slog.SetDefault(slog.New(slog.NewTextHandler(os.Stdout, nil)))

	cfg, err := config.Load()
	if err != nil { slog.Error("config", "err", err); os.Exit(1) }

	db, err := database.New(cfg.DatabaseURL)
	if err != nil { slog.Error("db", "err", err); os.Exit(1) }
	defer db.Close()

	ctx := context.Background()
	db.Exec(ctx, "TRUNCATE works, work_images, labs, lab_images, posts, contact_messages RESTART IDENTITY CASCADE")
	slog.Info("cleared existing data")

	seedAdmin(cfg)
	seedWorks(ctx, db, repository.NewWorkRepository(db))
	seedLabs(ctx, db, repository.NewLabRepository(db))
	seedPosts(repository.NewPostRepository(db))
	seedContacts(repository.NewContactRepository(db))

	slog.Info("seed complete ✓")
}

func strPtr(s string) *string { return &s }

func seedAdmin(cfg *config.Config) {
	hash, _ := bcrypt.GenerateFromPassword([]byte(cfg.AdminPassword), bcrypt.DefaultCost)
	slog.Info("✓ admin",
		"email", cfg.AdminEmail,
		"bcrypt_hash", string(hash),
	)
	slog.Info("  → set ADMIN_EMAIL and ADMIN_PASSWORD in .env to login")
}

func seedWorks(ctx context.Context, db *pgxpool.Pool, repo domain.WorkRepository) {
	type item struct {
		input  domain.CreateWorkInput
		images []string
	}

	items := []item{
		{
			input: domain.CreateWorkInput{
				Title:        "Simpuskes",
				Tagline:      "Puskesmas management system with body anatomy anamnesis",
				Description:  "<p>A comprehensive Puskesmas (Community Health Center) management system. Features patient data, doctor schedules, medical records, and a unique body anatomy anamnesis coordinate system for medical staff.</p><p>Built with JWT authentication, role-based access control, and optimized for performance across devices.</p>",
				ThumbnailURL: strPtr("https://images.unsplash.com/photo-1587370560942-ad2a04eabb6d?w=800&q=80"),
				Tags:         []string{"healthcare", "government", "fullstack"},
				TechStack:    []string{"Next.js", "TailwindCSS", "React Query", "JWT", "PostgreSQL"},
				Category:     domain.WorkCategoryWebApp,
				Status:       domain.WorkStatusLive,
				LiveURL:      strPtr("https://simpuskes.example.com"),
				GithubURL:    strPtr("https://github.com/aldngrha"),
				Year:         2024, Role: "Lead Frontend Engineer",
				Featured: true, SortOrder: 1,
			},
			images: []string{
				"https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1200&q=80",
				"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
				"https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=80",
			},
		},
		{
			input: domain.CreateWorkInput{
				Title:        "SITMAP",
				Tagline:      "Geospatial data management system for North Lampung",
				Description:  "<p>GIS platform for managing regional data of North Lampung. Integrated Google Maps API for precise marking of points, lines, and polygons.</p>",
				ThumbnailURL: strPtr("https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"),
				Tags:         []string{"GIS", "government", "maps"},
				TechStack:    []string{"Next.js", "Google Maps API", "TailwindCSS", "JWT"},
				Category:     domain.WorkCategoryOther,
				Status:       domain.WorkStatusLive,
				LiveURL:      strPtr("https://sitmap.example.com"),
				Year:         2024, Role: "Frontend Engineer",
				Featured: false, SortOrder: 2,
			},
			images: []string{
				"https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80",
				"https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80",
			},
		},
		{
			input: domain.CreateWorkInput{
				Title:        "MPP (Mal Pelayanan Publik)",
				Tagline:      "Public service mobile & web app with dynamic forms",
				Description:  "<p>Full-featured public service platform: Android mobile app (React Native) and admin web dashboard (Next.js). Features dynamic forms, push notifications, and role-based approval workflows.</p>",
				ThumbnailURL: strPtr("https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80"),
				Tags:         []string{"mobile", "government", "fullstack"},
				TechStack:    []string{"React Native", "Next.js", "NativeWind", "JWT"},
				Category:     domain.WorkCategoryMobile,
				Status:       domain.WorkStatusLive,
				LiveURL:      strPtr("https://mpp.example.com"),
				Year:         2024, Role: "Frontend Engineer",
				Featured: false, SortOrder: 3,
			},
			images: []string{
				"https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80",
				"https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=1200&q=80",
			},
		},
		{
			input: domain.CreateWorkInput{
				Title:        "Web3 Exchange Platform",
				Tagline:      "Decentralized exchange prototype on Solana",
				Description:  "<p>A dApp prototype on Solana blockchain. Features crypto wallet connectivity, transaction signing, and token interactions using Solana web3 libraries.</p>",
				ThumbnailURL: strPtr("https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80"),
				Tags:         []string{"blockchain", "web3", "dapp"},
				TechStack:    []string{"Next.js", "Solana", "Zustand", "TailwindCSS", "Shadcn UI"},
				Category:     domain.WorkCategoryBlockchain,
				Status:       domain.WorkStatusWIP,
				Year:         2025, Role: "Frontend Engineer",
				Featured: false, SortOrder: 4,
			},
			images: []string{
				"https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=1200&q=80",
				"https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=1200&q=80",
			},
		},
	}

	for _, it := range items {
		work, err := repo.Create(it.input)
		if err != nil { slog.Error("seed work failed", "title", it.input.Title, "err", err); continue }
		for i, url := range it.images {
			db.Exec(ctx, "INSERT INTO work_images(work_id, url, sort_order) VALUES($1,$2,$3)", work.ID, url, i)
		}
		slog.Info("✓ work", "title", work.Title, "images", len(it.images))
	}
}

func seedLabs(ctx context.Context, db *pgxpool.Pool, repo domain.LabRepository) {
	type item struct {
		input  domain.CreateLabInput
		images []string
	}

	items := []item{
		{
			input: domain.CreateLabInput{
				Title: "NFC Attendance", Description: "E-attendance app for school using NFC Card. Built with React Native and Firebase as BaaS.",
				Tags: []string{"React Native", "Firebase", "NFC"}, Category: domain.LabCategoryWeb, Status: domain.LabStatusDone,
				GithubURL: strPtr("https://github.com/aldngrha/nfc-attendance"), SortOrder: 1,
			},
			images: []string{
				"https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&q=80",
				"https://images.unsplash.com/photo-1596558450268-9c27524ba856?w=1200&q=80",
			},
		},
		{
			input: domain.CreateLabInput{
				Title: "E-Cooperative", Description: "E-Cooperative system for Junior High School implementing cash flow management. Built with Laravel.",
				Tags: []string{"Laravel", "PHP", "MySQL"}, Category: domain.LabCategoryWeb, Status: domain.LabStatusDone,
				GithubURL: strPtr("https://github.com/aldngrha"), SortOrder: 2,
			},
			images: []string{
				"https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80",
				"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
			},
		},
		{
			input: domain.CreateLabInput{
				Title: "This Portfolio", Description: "Personal portfolio built with SvelteKit, Go, and PostgreSQL. Full CMS, dark mode, bilingual, self-hosted on a $6 VPS.",
				Tags: []string{"SvelteKit", "Go", "PostgreSQL", "Docker"}, Category: domain.LabCategoryWeb, Status: domain.LabStatusWIP,
				GithubURL: strPtr("https://github.com/aldngrha/portfolio"), SortOrder: 3,
			},
			images: []string{
				"https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1200&q=80",
				"https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=1200&q=80",
				"https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80",
			},
		},
		{
			input: domain.CreateLabInput{
				Title: "Solana Wallet Explorer", Description: "CLI tool to explore Solana wallet transactions and token balances. Built in Go.",
				Tags: []string{"Go", "Solana", "CLI"}, Category: domain.LabCategoryBlockchain, Status: domain.LabStatusWIP,
				SortOrder: 4,
			},
			images: []string{
				"https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=80",
				"https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=1200&q=80",
			},
		},
	}

	for _, it := range items {
		lab, err := repo.Create(it.input)
		if err != nil { slog.Error("seed lab failed", "title", it.input.Title, "err", err); continue }
		for i, url := range it.images {
			db.Exec(ctx, "INSERT INTO lab_images(lab_id, url, sort_order) VALUES($1,$2,$3)", lab.ID, url, i)
		}
		slog.Info("✓ lab", "title", lab.Title, "images", len(it.images))
	}
}

func seedPosts(repo domain.PostRepository) {
	published := true
	posts := []domain.CreatePostInput{
		{
			Title: "Self-hosting everything on a $6 VPS",
			Excerpt: "How I deploy all my projects on a single DigitalOcean droplet using Docker, Nginx Proxy Manager, and GitHub Actions.",
			Content: "<h2>Why self-host?</h2><p>I wanted full control over my stack without paying for multiple managed services. A $6/month DigitalOcean droplet with Docker is surprisingly capable for personal projects.</p><h2>The setup</h2><p>Docker for containerization, Nginx Proxy Manager for reverse proxy and SSL, and GitHub Actions for CI/CD.</p><h2>The workflow</h2><p>Push to main → GitHub Actions builds Docker images → pushes to Docker Hub → SSH to VPS → pull and restart containers.</p>",
			Tags: []string{"devops", "docker", "self-hosting"}, Category: "devops", ReadTime: 6, Published: published,
		},
		{
			Title: "Why I switched to SvelteKit",
			Excerpt: "After years of React and Next.js, here's what made me move to SvelteKit and what I think about it now.",
			Content: "<h2>The React fatigue is real</h2><p>After building dozens of projects with React, most complexity came from managing state, not from actual product logic.</p><h2>What Svelte does differently</h2><p>Svelte compiles away the framework. No virtual DOM, no hook rules. State is just a variable.</p>",
			Tags: []string{"svelte", "frontend", "react"}, Category: "frontend", ReadTime: 4, Published: published,
		},
		{
			Title: "Getting started with Go for backend",
			Excerpt: "My experience picking up Go after years of JavaScript — what surprised me and why I'm sticking with it.",
			Content: "<h2>Coming from JavaScript</h2><p>Go is explicit. No implicit type coercion, no undefined behavior. If something can fail, you handle the error right there.</p><h2>Is it worth it?</h2><p>Yes. Go produces small, fast binaries. The Docker image for this backend is under 20MB.</p>",
			Tags: []string{"go", "backend", "api"}, Category: "backend", ReadTime: 5, Published: published,
		},
		{
			Title: "How I got into blockchain development",
			Excerpt: "The story of how I went from building web apps to exploring smart contracts and on-chain systems.",
			Content: "<h2>The rabbit hole</h2><p>It started with a client project — a Web3 platform on Solana. I was hired as frontend but couldn't help digging into how the protocol actually worked.</p><h2>Where I'm at</h2><p>Still learning. Blockchain is a deep rabbit hole but the fundamentals are starting to feel familiar.</p>",
			Tags: []string{"blockchain", "solana", "web3"}, Category: "blockchain", ReadTime: 5, Published: published,
		},
	}

	for _, p := range posts {
		post, err := repo.Create(p)
		if err != nil { slog.Error("seed post failed", "title", p.Title, "err", err); continue }
		slog.Info("✓ post", "title", post.Title)
	}
}

func seedContacts(repo domain.ContactRepository) {
	contacts := []domain.CreateContactInput{
		{Name: "John Doe", Email: "john@example.com", Subject: "Freelance project inquiry", Message: "Hi Aldi, I came across your portfolio and I'm interested in working together on a web application. Would you be available for a quick call?"},
		{Name: "Sarah Chen", Email: "sarah@startup.io", Subject: "Full-time opportunity", Message: "Hey! We're an early-stage startup looking for a senior frontend engineer. Your SvelteKit and blockchain experience caught our eye. Would love to chat!"},
	}

	for _, c := range contacts {
		msg, err := repo.Create(c)
		if err != nil { slog.Error("seed contact failed", "name", c.Name, "err", err); continue }
		slog.Info("✓ contact", "name", msg.Name)
	}
}
