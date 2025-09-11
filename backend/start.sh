#!/bin/sh

# Script de inicio para el backend de Medusa
echo "🚀 Iniciando backend de Medusa..."

# Verificar variables de entorno críticas
if [ -z "$DATABASE_URL" ]; then
    echo "❌ ERROR: DATABASE_URL no está configurada"
    exit 1
fi

if [ -z "$JWT_SECRET" ]; then
    echo "❌ ERROR: JWT_SECRET no está configurada"
    exit 1
fi

if [ -z "$COOKIE_SECRET" ]; then
    echo "❌ ERROR: COOKIE_SECRET no está configurada"
    exit 1
fi

echo "✅ Variables de entorno verificadas"

# Esperar a que la base de datos esté disponible
echo "⏳ Esperando a que PostgreSQL esté disponible..."
until pg_isready -h postgres -p 5432 -U medusa; do
    echo "PostgreSQL no está listo - esperando..."
    sleep 2
done

echo "✅ PostgreSQL está disponible"

# Inicializar el backend
echo "🔧 Inicializando backend..."
pnpm run ib

echo "🚀 Iniciando servidor Medusa..."
exec pnpm start
