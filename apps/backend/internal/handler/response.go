package handler

import (
	"encoding/json"
	"net/http"
)

type Response[T any] struct {
	Data    T      `json:"data"`
	Message string `json:"message,omitempty"`
}

type PaginatedResponse[T any] struct {
	Data       T      `json:"data"`
	Total      int    `json:"total"`
	Page       int    `json:"page"`
	PerPage    int    `json:"per_page"`
	TotalPages int    `json:"total_pages"`
}

type ErrorResponse struct {
	Error string `json:"error"`
	Code  string `json:"code,omitempty"`
}

func JSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(v)
}

func Ok[T any](w http.ResponseWriter, data T) {
	JSON(w, http.StatusOK, Response[T]{Data: data})
}

func Created[T any](w http.ResponseWriter, data T) {
	JSON(w, http.StatusCreated, Response[T]{Data: data})
}

func NoContent(w http.ResponseWriter) {
	w.WriteHeader(http.StatusNoContent)
}

func BadRequest(w http.ResponseWriter, msg string) {
	JSON(w, http.StatusBadRequest, ErrorResponse{Error: msg})
}

func Unauthorized(w http.ResponseWriter) {
	JSON(w, http.StatusUnauthorized, ErrorResponse{Error: "unauthorized"})
}

func NotFound(w http.ResponseWriter, msg string) {
	JSON(w, http.StatusNotFound, ErrorResponse{Error: msg})
}

func InternalError(w http.ResponseWriter, err error) {
	JSON(w, http.StatusInternalServerError, ErrorResponse{Error: "internal server error"})
}

func Paginated[T any](w http.ResponseWriter, data T, total, page, perPage int) {
	totalPages := total / perPage
	if total%perPage != 0 {
		totalPages++
	}
	JSON(w, http.StatusOK, PaginatedResponse[T]{
		Data:       data,
		Total:      total,
		Page:       page,
		PerPage:    perPage,
		TotalPages: totalPages,
	})
}

func Decode(r *http.Request, v any) error {
	return json.NewDecoder(r.Body).Decode(v)
}
