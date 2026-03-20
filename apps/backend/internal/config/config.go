package config

import (
	"fmt"
	"os"
	"strconv"
)

type Config struct {
	Port           string
	Env            string
	DatabaseURL    string
	JWTSecret      string
	JWTExpireHours int
	AdminEmail     string
	AdminPassword  string
	SupabaseURL        string
	SupabaseServiceKey string
	SupabaseBucket     string
	ResendAPIKey   string
	EmailFrom      string
	EmailTo        string
	AllowedOrigins string
}

func Load() (*Config, error) {
	cfg := &Config{
		Port:           getEnv("PORT", "8080"),
		Env:            getEnv("ENV", "development"),
		DatabaseURL:    mustGetEnv("DATABASE_URL"),
		JWTSecret:      mustGetEnv("JWT_SECRET"),
		JWTExpireHours: getEnvInt("JWT_EXPIRE_HOURS", 72),
		AdminEmail:     mustGetEnv("ADMIN_EMAIL"),
		AdminPassword:  mustGetEnv("ADMIN_PASSWORD"),
		SupabaseURL:        mustGetEnv("SUPABASE_URL"),
		SupabaseServiceKey: mustGetEnv("SUPABASE_SERVICE_KEY"),
		SupabaseBucket:     getEnv("SUPABASE_BUCKET", "portfolio"),
		ResendAPIKey:   getEnv("RESEND_API_KEY", ""),
		EmailFrom:      getEnv("EMAIL_FROM", "noreply@aldinugraha.me"),
		EmailTo:        getEnv("EMAIL_TO", "aldi.nugrahatk@gmail.com"),
		AllowedOrigins: getEnv("ALLOWED_ORIGINS", "http://localhost:5173"),
	}
	return cfg, nil
}

func getEnv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}

func mustGetEnv(key string) string {
	v := os.Getenv(key)
	if v == "" {
		panic(fmt.Sprintf("required env var %q is not set", key))
	}
	return v
}

func getEnvInt(key string, fallback int) int {
	if v := os.Getenv(key); v != "" {
		if i, err := strconv.Atoi(v); err == nil {
			return i
		}
	}
	return fallback
}
