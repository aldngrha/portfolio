# Portfolio

Personal portfolio & blog built with SvelteKit, Go, and PostgreSQL.

## Stack
- **Frontend:** SvelteKit + TailwindCSS + MDSveX
- **Backend:** Go
- **Database:** PostgreSQL
- **Infra:** Docker + Nginx Proxy Manager

## Structure
```
apps/
├── frontend/   # SvelteKit
└── backend/    # Go
```

## Development
```bash
# Frontend
cd apps/frontend
bun run dev

# Backend
cd apps/backend
go run main.go
```
