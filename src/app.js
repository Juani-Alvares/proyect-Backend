import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB conectada"))
    .catch(err => console.log("Error DB:", err));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ status: "error", message: "Error interno del servidor" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));