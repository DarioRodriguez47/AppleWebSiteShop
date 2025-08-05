# Apple Catalog Manager

Este proyecto es una aplicación web dividida en dos partes principales:

- **backend/**: API REST con Node.js, Express y MongoDB para la gestión de productos Apple y autenticación de usuarios.
- **frontend-productos/**: SPA en React para consumir la API y mostrar productos Apple.

## Estructura del proyecto

```
AppleWebSide/
  backend/
    app.js
    index.js
    package.json
    controllers/
    models/
    routes/
    uploads/
  frontend-productos/
    src/
    public/
    package.json
    README.md
```

---

# Cómo levantar el proyecto

## Backend

1. Instala las dependencias:
   ```bash
   cd backend
   npm install
   ```
2. (Opcional) Crea un archivo `.env` para tus variables de entorno (por ejemplo, cadena de conexión a MongoDB).
3. Inicia el servidor:
   ```bash
   npm start
   ```
   El backend estará disponible en `http://localhost:3001` (o el puerto configurado).

## Frontend

1. Instala las dependencias:
   ```bash
   cd frontend-productos
   npm install
   ```
2. Inicia la aplicación:
   ```bash
   npm start
   ```
   El frontend estará disponible en `http://localhost:3000`.

---

# Levantar ambos entornos

1. Abre dos terminales.
2. En una, ejecuta el backend:
   ```bash
   cd backend
   npm start
   ```
3. En otra, ejecuta el frontend:
   ```bash
   cd frontend-productos
   npm start
   ```

¡Listo! Ahora puedes desarrollar y probar la aplicación completa.

---

## Licencia

[MIT](LICENSE)
