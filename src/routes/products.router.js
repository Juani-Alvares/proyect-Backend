import { Router } from 'express';
import ProductDao from '../dao/mongo/product.dao.js';

import { auth } from '../middlewares/auth.middleware.js';
import { authorization } from '../middlewares/authorization.middleware.js';

const router = Router();
const productService = new ProductDao();


router.get('/', async (req, res) => {

    try {

        const products = await productService.getAll();

        res.send({
            status: "success",
            payload: products
        });

    } catch (error) {

        res.status(500).send({
            status: "error",
            message: error.message
        });

    }

});

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Obtener productos
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: Lista de productos
 */

router.get('/:pid', async (req, res) => {

    try {

        const product = await productService.getById(req.params.pid);

        if (!product) {

            return res.status(404).send({
                status: "error",
                message: "Product not found"
            });

        }

        res.send({
            status: "success",
            payload: product
        });

    } catch (error) {

        res.status(500).send({
            status: "error",
            message: error.message
        });

    }

});


router.post(
    '/',
    auth,
    authorization("admin"),
    async (req, res) => {

        try {

            const result = await productService.create(req.body);

            res.status(201).send({
                status: "success",
                payload: result
            });

        } catch (error) {

            res.status(500).send({
                status: "error",
                message: error.message
            });

        }

    }
);


router.put(
    '/:pid',
    auth,
    authorization("admin"),
    async (req, res) => {

        try {

            const result = await productService.update(
                req.params.pid,
                req.body
            );

            res.send({
                status: "success",
                payload: result
            });

        } catch (error) {

            res.status(500).send({
                status: "error",
                message: error.message
            });

        }

    }
);


router.delete(
    '/:pid',
    auth,
    authorization("admin"),
    async (req, res) => {

        try {

            await productService.delete(req.params.pid);

            res.send({
                status: "success",
                message: "Product deleted"
            });

        } catch (error) {

            res.status(500).send({
                status: "error",
                message: error.message
            });

        }

    }
);

export default router;