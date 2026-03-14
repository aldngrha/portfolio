# ─── Stage 1: Build ──────────────────────────────────────────────────────────
FROM oven/bun:1 AS builder

WORKDIR /app

# Install deps
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile

# Copy source
COPY . .

# Build
RUN bun run build

# ─── Stage 2: Runtime ────────────────────────────────────────────────────────
FROM oven/bun:1-slim AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy built output
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./

# Install only production deps
RUN bun install --production --frozen-lockfile

EXPOSE 3000

CMD ["bun", "./build/index.js"]
