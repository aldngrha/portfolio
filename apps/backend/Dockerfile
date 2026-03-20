# ─── Stage 1: Build ──────────────────────────────────────────────────────────
FROM golang:1.22-alpine AS builder

WORKDIR /app

# Install dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy source
COPY . .

# Build binary
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -o /app/api ./cmd/api

# ─── Stage 2: Runtime ────────────────────────────────────────────────────────
FROM alpine:3.20 AS runner

WORKDIR /app

# Add CA certs for HTTPS calls (Supabase, Resend)
RUN apk --no-cache add ca-certificates tzdata

# Copy binary and migrations
COPY --from=builder /app/api .
COPY --from=builder /app/migrations ./migrations

EXPOSE 8080

CMD ["./api"]
