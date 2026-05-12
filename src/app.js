import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import authRouter from './routes/auth.router.js';
import sessionRouter from './routes/session.router.js';
import session from "express-session";
import MongoStore from "connect-mongo";
import swaggerUiExpress from "swagger-ui-express";
import specs from "./docs/swagger.config.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL
    }),
    secret: "secret_session",
    resave: false,
    saveUninitialized: false
}));

initializePassport();
app.use(passport.initialize());

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB conectada"))
    .catch(err => console.log("Error DB:", err));

app.use(
    "/api/docs",
    swaggerUiExpress.serve,
    swaggerUiExpress.setup(specs)
);

app.use('/api/v1/products', productsRouter);
app.use('/api/v1/carts', cartsRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/session', sessionRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).send({
        status: "error",
        message: "Error interno del servidor"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});