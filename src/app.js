import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import handlebars from "express-handlebars";

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import ProductManager from "./managers/ProductManager.js";

const app = express();
const PORT = 8080;


const httpServer = createServer(app);

const io = new Server(httpServer);

app.set("io", io);

app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

const productManager = new ProductManager();

io.on("connection", async (socket) => {
  console.log("🟢 Cliente conectado");

  const products = await productManager.getProducts();
  socket.emit("updateProducts", products);

  socket.on("addProduct", async (product) => {
    await productManager.addProduct(product);
    const updatedProducts = await productManager.getProducts();
    io.emit("updateProducts", updatedProducts);
  });

  socket.on("deleteProduct", async (id) => {
    await productManager.deleteProduct(Number(id));
    const updatedProducts = await productManager.getProducts();
    io.emit("updateProducts", updatedProducts);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Cliente desconectado");
  });
});

httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
