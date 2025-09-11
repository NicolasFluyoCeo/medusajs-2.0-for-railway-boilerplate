FROM node:22-alpine

WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm@9.10.0

# Copiar archivos de dependencias
COPY package.json pnpm-lock.yaml ./

# Instalar dependencias
RUN pnpm install --frozen-lockfile

# Copiar código fuente
COPY . .

# Build de la aplicación
RUN pnpm run build

# Exponer puerto
EXPOSE 9000

# Comando de inicio
CMD ["pnpm", "start"]
