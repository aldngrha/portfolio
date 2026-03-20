package handler

import (
	"net/http"
	"time"

	"github.com/aldngrha/portfolio-backend/internal/config"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

type AuthHandler struct {
	cfg *config.Config
}

func NewAuthHandler(cfg *config.Config) *AuthHandler {
	return &AuthHandler{cfg: cfg}
}

type loginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type loginResponse struct {
	Token     string `json:"token"`
	ExpiresAt string `json:"expires_at"`
}

func (h *AuthHandler) Login(w http.ResponseWriter, r *http.Request) {
	var req loginRequest
	if err := Decode(r, &req); err != nil {
		BadRequest(w, "invalid request body")
		return
	}

	// Check credentials
	if req.Email != h.cfg.AdminEmail {
		JSON(w, http.StatusUnauthorized, ErrorResponse{Error: "invalid credentials"})
		return
	}

	// Compare password — stored as bcrypt hash in env, fallback to plain for dev
	if err := bcrypt.CompareHashAndPassword([]byte(h.cfg.AdminPassword), []byte(req.Password)); err != nil {
		// Fallback: plain text comparison for dev convenience
		if req.Password != h.cfg.AdminPassword {
			JSON(w, http.StatusUnauthorized, ErrorResponse{Error: "invalid credentials"})
			return
		}
	}

	expiresAt := time.Now().Add(time.Duration(h.cfg.JWTExpireHours) * time.Hour)
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub":   req.Email,
		"role":  "admin",
		"exp":   expiresAt.Unix(),
		"iat":   time.Now().Unix(),
	})

	signed, err := token.SignedString([]byte(h.cfg.JWTSecret))
	if err != nil {
		InternalError(w, err)
		return
	}

	Ok(w, loginResponse{
		Token:     signed,
		ExpiresAt: expiresAt.Format(time.RFC3339),
	})
}
