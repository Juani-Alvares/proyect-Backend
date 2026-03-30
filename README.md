# Backend E-commerce API

Este proyecto es una API REST para la gestión de productos y carritos de compra, utilizando Node.js, Express y MongoDB.

## Tecnologías
- Node.js & Express
- MongoDB Atlas & Mongoose
- Dotenv (Gestión de variables de entorno)

## Cómo empezar
1. Clonar el repositorio.
2. Ejecutar `npm install`.
3. Crear un archivo `.env` basado en el ejemplo proporcionado.
4. Ejecutar `npm run dev` para iniciar el servidor.

## Endpoints Principales
- **Productos**: `GET /api/products`, `POST /api/products` (con validación).
- **Carritos**: `GET /api/carts/:cid` (con populate), `PUT /api/carts/:cid`, `DELETE /api/carts/:cid/products/:pid`.