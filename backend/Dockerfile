FROM node:22-alpine

WORKDIR /app

# Instalar herramientas del sistema y PostgreSQL client
RUN apk add --no-cache postgresql-client bash

# Instalar pnpm
RUN npm install -g pnpm@9.10.0

# Copiar archivos de dependencias
COPY package.json pnpm-lock.yaml ./

# Instalar dependencias
RUN pnpm install --frozen-lockfile

# Copiar código fuente
COPY . .

# Crear variables de entorno temporales para el build
ENV DATABASE_URL=postgresql://temp:temp@temp:5432/temp
ENV ADMIN_CORS=http://localhost:9000
ENV AUTH_CORS=http://localhost:9000
ENV STORE_CORS=http://localhost:3000
ENV JWT_SECRET=temp_jwt_secret_for_build_only
ENV COOKIE_SECRET=temp_cookie_secret_for_build_only

# Build de la aplicación
RUN pnpm run build

# Limpiar variables temporales
ENV DATABASE_URL=
ENV ADMIN_CORS=
ENV AUTH_CORS=
ENV STORE_CORS=
ENV JWT_SECRET=
ENV COOKIE_SECRET=

# Copiar y hacer ejecutable el script de inicio
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Exponer puerto
EXPOSE 9000

# Comando de inicio
CMD ["/start.sh"]
