# -------- Build stage --------
FROM node:20-alpine AS builder
WORKDIR /app

ENV CI=1 \
    NEXT_TELEMETRY_DISABLED=1

# 1) Instala deps con lockfile
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

# 2) Copia el código y build
COPY . .
RUN npm run build

# -------- Run stage --------
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000

# (opcional) Salud con curl
RUN apk add --no-cache curl

# 3) Copia manifest + lockfile para poder usar npm ci
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./

# 4) Copia artefactos de la build
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/src ./src

# 5) Instala solo prod deps usando el lockfile
RUN npm ci --omit=dev --ignore-scripts

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s \
  CMD curl -fsS http://localhost:3000 || exit 1

CMD ["npm", "start", "--", "-p", "3000"]
