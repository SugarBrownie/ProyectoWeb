# ---------- Build stage ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Copiamos los manifests para resolver deps
COPY package.json package-lock.json* ./

# Instala TODAS las deps para compilar (respetando lockfile)
RUN npm ci --ignore-scripts

# Copia el resto del proyecto
COPY . .

# Build de Next (produce .next/ de prod)
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ---------- Run stage ----------
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copiamos solo lo necesario para correr
COPY --from=builder /app/package.json /app/package-lock.json ./
# Instala SOLO deps de producción (usa lockfile!)
RUN npm ci --omit=dev --ignore-scripts

# App buildeada y assets públicos
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
# Si usas src/, next.config.js/ts u otros, cópialos también:
COPY --from=builder /app/next.config.* ./ 
COPY --from=builder /app/src ./src

EXPOSE 3000

# Arranque
CMD ["npx", "next", "start", "-p", "3000"]
