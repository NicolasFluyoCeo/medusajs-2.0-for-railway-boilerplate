FROM node:22-alpine

WORKDIR /app

# Instalar dependencias del sistema
RUN apk add --no-cache libc6-compat

# Instalar pnpm
RUN npm install -g pnpm

# Copiar archivos de dependencias
COPY package.json pnpm-lock.yaml ./

# Instalar dependencias
RUN pnpm install --frozen-lockfile

# Copiar código fuente
COPY . .

# Variables de entorno para build
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV GENERATE_SOURCEMAP=false
ENV NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
ENV NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_temp_key_for_build_only

# Build directo sin esperar backend
RUN NODE_OPTIONS='--max-old-space-size=1024' pnpm run build:next

# Limpiar variable temporal
ENV NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=

# Exponer puerto
EXPOSE 3000

# Comando de inicio optimizado
CMD NODE_OPTIONS='--max-old-space-size=512' pnpm run start
