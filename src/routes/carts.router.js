import { Router } from 'express';
import CartDao from '../dao/mongo/cart.dao.js';
import { auth } from '../middlewares/auth.middleware.js';

const router = Router();
const cartService = new CartDao();

/**
 * @swagger
 * /api/v1/carts/my-cart:
 *   get:
 *     summary: Obtener carrito del usuario
 *     tags:
 *       - Carts
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Carrito obtenido
 */

router.get('/my-cart', auth, async (req, res) => {

    try {

        const user = req.user;

        if (!user.cart) {
            return res.status(404).send({
                status: "error",
                message: "El usuario no tiene carrito"
            });
        }

        const cart = await cartService.getById(user.cart);

        res.send({
            status: "success",
            payload: cart
        });

    } catch (error) {

        res.status(500).send({
            status: "error",
            message: error.message
        });

    }

});


router.post('/', auth, async (req, res) => {

    try {

        const result = await cartService.create();

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

});


router.get('/:cid', auth, async (req, res) => {

    try {

        const cart = await cartService.getById(req.params.cid);

        if (!cart) {

            return res.status(404).send({
                status: "error",
                message: "Cart not found"
            });

        }

        res.send({
            status: "success",
            payload: cart
        });

    } catch (error) {

        res.status(500).send({
            status: "error",
            message: error.message
        });

    }

});


router.delete('/:cid/products/:pid', auth, async (req, res) => {

    try {

        const { cid, pid } = req.params;

        const cart = await cartService.getById(cid);

        if (!cart) {

            return res.status(404).send({
                status: "error",
                message: "Cart not found"
            });

        }

        cart.products = cart.products.filter(
            p => p.product._id.toString() !== pid
        );

        await cartService.update(cid, cart);

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

});


router.put('/:cid', auth, async (req, res) => {

    try {

        const result = await cartService.update(
            req.params.cid,
            { products: req.body.products }
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

});

export default router;