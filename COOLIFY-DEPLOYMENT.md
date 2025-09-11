# 🚀 Despliegue en Coolify - Medusa 2.0

Esta guía te ayudará a desplegar tu aplicación MedusaJS 2.0 en Coolify.

## 📋 Requisitos Previos

- Servidor con Coolify instalado
- Dominio configurado
- Repositorio Git con el código

## 🔧 Configuración Inicial

### 1. Preparar Variables de Entorno

Copia el archivo `env.example` y renómbralo a `.env`:

```bash
cp env.example .env
```

Edita el archivo `.env` con tus valores reales:

```bash
# Ejemplo de configuración mínima
POSTGRES_PASSWORD=mi_password_super_seguro
BACKEND_PUBLIC_URL=https://api.midominio.com
ADMIN_CORS=https://api.midominio.com,https://midominio.com
AUTH_CORS=https://api.midominio.com,https://midominio.com
STORE_CORS=https://midominio.com
JWT_SECRET=mi_jwt_secret_de_32_caracteres_minimo
COOKIE_SECRET=mi_cookie_secret_de_32_caracteres_minimo
MINIO_ACCESS_KEY=minio_access_key
MINIO_SECRET_KEY=minio_secret_key_8_chars_min
MEILISEARCH_ADMIN_KEY=meilisearch_key_16_chars_min
```

### 2. Generar Secretos Seguros

Puedes usar estos comandos para generar secretos seguros:

```bash
# Para JWT_SECRET y COOKIE_SECRET
openssl rand -base64 32

# Para MINIO_SECRET_KEY
openssl rand -base64 12

# Para MEILISEARCH_ADMIN_KEY
openssl rand -base64 16
```

## 🏗️ Configuración en Coolify

### 1. Crear Nuevo Proyecto

1. Accede a tu panel de Coolify
2. Crea un nuevo proyecto
3. Conecta tu repositorio Git
4. Selecciona "Docker Compose" como tipo de aplicación

### 2. Configurar Servicios

Coolify detectará automáticamente el archivo `docker-compose.yml` y configurará los siguientes servicios:

- **PostgreSQL** (puerto 5432)
- **Redis** (puerto 6379)
- **Meilisearch** (puerto 7700)
- **MinIO** (puertos 9000, 9001)
- **Backend Medusa** (puerto 9000)
- **Storefront Next.js** (puerto 3000)

### 3. Configurar Dominios

Configura los siguientes dominios en Coolify:

- **Backend**: `api.tudominio.com` → puerto 9000
- **Storefront**: `tudominio.com` → puerto 3000
- **MinIO Console**: `minio.tudominio.com` → puerto 9001 (opcional)

### 4. Variables de Entorno

En el panel de Coolify, configura todas las variables del archivo `.env`:

```
POSTGRES_PASSWORD=tu_password
BACKEND_PUBLIC_URL=https://api.tudominio.com
ADMIN_CORS=https://api.tudominio.com,https://tudominio.com
AUTH_CORS=https://api.tudominio.com,https://tudominio.com
STORE_CORS=https://tudominio.com
JWT_SECRET=tu_jwt_secret
COOKIE_SECRET=tu_cookie_secret
MEDUSA_PUBLISHABLE_KEY=pk_se_genera_automaticamente
MINIO_ACCESS_KEY=tu_minio_access_key
MINIO_SECRET_KEY=tu_minio_secret_key
MINIO_BUCKET=medusa-media
RESEND_API_KEY=tu_resend_api_key
RESEND_FROM_EMAIL=noreply@tudominio.com
STRIPE_API_KEY=tu_stripe_api_key
STRIPE_WEBHOOK_SECRET=tu_stripe_webhook_secret
MEILISEARCH_ADMIN_KEY=tu_meilisearch_admin_key
```

## 🚀 Despliegue

### 1. Primer Despliegue

1. Haz push de todos los cambios a tu repositorio:
   ```bash
   git add .
   git commit -m "feat: add Coolify deployment configuration"
   git push
   ```

2. En Coolify, inicia el despliegue
3. Espera a que todos los servicios estén saludables

### 2. Verificación Post-Despliegue

Verifica que todos los servicios funcionen correctamente:

- **Backend Health**: `https://api.tudominio.com/health`
- **Storefront**: `https://tudominio.com`
- **Admin Panel**: `https://api.tudominio.com/app`
- **MinIO Console**: `https://minio.tudominio.com` (si configurado)

### 3. Configuración Inicial de Medusa

1. Accede al admin panel: `https://api.tudominio.com/app`
2. Crea tu usuario administrador
3. Configura tu tienda (regiones, productos, etc.)

## 🔧 Configuraciones Adicionales

### SSL/TLS

Coolify maneja automáticamente los certificados SSL con Let's Encrypt.

### Backups

Configura backups regulares para:
- Base de datos PostgreSQL
- Archivos de MinIO
- Índices de Meilisearch

### Monitoreo

Coolify incluye métricas básicas. Para monitoreo avanzado, considera:
- Logs centralizados
- Métricas de aplicación
- Alertas de salud

## 🐛 Solución de Problemas

### Backend no inicia

1. Verifica las variables de entorno
2. Revisa los logs del contenedor
3. Asegúrate de que PostgreSQL esté disponible

### Storefront no se conecta al backend

1. Verifica `NEXT_PUBLIC_MEDUSA_BACKEND_URL`
2. Revisa la configuración CORS
3. Confirma que el backend esté respondiendo

### Problemas de archivos/imágenes

1. Verifica la configuración de MinIO
2. Revisa los permisos del bucket
3. Confirma la conectividad entre servicios

## 📚 Recursos Adicionales

- [Documentación de Coolify](https://coolify.io/docs)
- [Documentación de Medusa](https://docs.medusajs.com)
- [Docker Compose Reference](https://docs.docker.com/compose/)

## 🆘 Soporte

Si encuentras problemas:

1. Revisa los logs en Coolify
2. Verifica la configuración de variables de entorno
3. Consulta la documentación oficial
4. Abre un issue en el repositorio
