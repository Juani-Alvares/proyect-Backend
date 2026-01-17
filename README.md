# Backend I - Entrega 1

Creador: Juan Ignacio Alvares

Comision:  76735  

Este proyecto corresponde a la **Entrega 1 del curso Backend I**.
El objetivo es crear una API REST sencilla utilizando **Node.js y Express**, trabajando con archivos JSON como persistencia de datos.

---

## 🚀 Cómo ejecutar el proyecto

1. Instalar dependencias:

```bash
npm install
```

2. Iniciar el servidor:

```bash
npm start
```

El servidor se ejecuta en:

```
http://localhost:8080
```

---

## 📁 Estructura del proyecto

* **app.js**
  Archivo principal donde se inicializa Express y se configuran las rutas.

* **routes/**
  Contiene las rutas de productos y carritos.

* **managers/**
  Contiene las clases `ProductManager` y `CartManager`, que manejan la lógica y la persistencia en archivos JSON.

* **data/**
  Archivos JSON donde se guardan los productos y carritos.

---

## 🛍️ Endpoints de Productos

* `GET /api/products`
  Obtiene todos los productos.

* `GET /api/products/:pid`
  Obtiene un producto por su ID.

* `POST /api/products`
  Crea un nuevo producto (con validaciones).

* `PUT /api/products/:pid`
  Actualiza un producto existente.

* `DELETE /api/products/:pid`
  Elimina un producto por ID.

---

## 🛒 Endpoints de Carritos

* `POST /api/carts`
  Crea un nuevo carrito.

* `GET /api/carts/:cid`
  Obtiene un carrito por su ID.

* `POST /api/carts/:cid/product/:pid`
  Agrega un producto al carrito (si existe, incrementa la cantidad).

---

## ✅ Checklist Entrega 1

*

---

## 📌 Notas finales

El proyecto utiliza archivos JSON como base de datos para cumplir con los requisitos de la entrega.
El manejo de errores se realiza mediante `try/catch` para evitar que el servidor se caiga ante errores.
