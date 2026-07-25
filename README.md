# 🐾 Backend Adoption API

Backend desarrollado con **Node.js**, **Express** y **MongoDB**, que implementa una API REST para la gestión de adopciones de mascotas.

---

# 🚀 Tecnologías utilizadas

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT
- Passport
- GitHub OAuth
- Jest
- Supertest
- Docker

---

# 📦 Instalación

Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
```

Ingresar al proyecto:

```bash
cd proyect-Backend
```

Instalar dependencias:

```bash
npm install
```

---

# ⚙️ Variables de entorno

Crear un archivo `.env` con la siguiente configuración:

```env
PORT=8080

MONGO_URL=tu_cadena_de_conexion_mongodb

JWT_SECRET=tu_jwt_secret

GITHUB_CLIENT_ID=tu_client_id
GITHUB_CLIENT_SECRET=tu_client_secret
```

---

# ▶️ Ejecutar el proyecto

Modo producción:

```bash
npm start
```

Modo desarrollo:

```bash
npm run dev
```

---

# 🧪 Ejecutar los tests

El proyecto incluye pruebas funcionales realizadas con **Jest** y **Supertest**.

Ejecutar:

```bash
npm test
```

---

# 🐳 Docker

## Construir la imagen

```bash
docker build -t backend-adoption:v1 .
```

## Ejecutar el contenedor

```bash
docker run -p 8080:8080 backend-adoption:v1
```

---

# 📚 Documentación

Swagger disponible en:

```
/api/docs
```

---

# 🔐 Autenticación

El proyecto implementa:

- JWT
- Cookies
- Passport
- GitHub OAuth

---

# 📌 Endpoints principales

## Adoptions

| Método | Endpoint |
|---------|----------|
| GET | /api/v1/adoptions |
| GET | /api/v1/adoptions/:id |
| POST | /api/v1/adoptions |
| PUT | /api/v1/adoptions/:id |
| DELETE | /api/v1/adoptions/:id |

---

# ✅ Características

- API REST
- Arquitectura por capas
- MongoDB Atlas
- Docker
- Tests funcionales con Jest
- Supertest
- Swagger
- Autenticación JWT
- Passport
- GitHub OAuth

---

# 👨‍💻 Autor

**Juani Alvares**