# Backend - Apple Catalog Manager

API RESTful para la gestión de productos Apple y autenticación de usuarios.

## Requisitos

- Node.js >= 14
- MongoDB (local o Atlas)

## Instalación y uso

1. Instala las dependencias:
   ```bash
   npm install
   ```
2. (Opcional) Crea un archivo `.env` para tus variables de entorno (por ejemplo, cadena de conexión a MongoDB).
3. Inicia el servidor:
   ```bash
   npm start
   ```
   El backend estará disponible en `http://localhost:3001` (o el puerto configurado).

## Estructura

- `controllers/` Lógica de negocio
- `models/` Esquemas de Mongoose
- `routes/` Definición de rutas
- `uploads/` Imágenes subidas

## Scripts útiles

- `npm start` — Inicia el servidor con nodemon
