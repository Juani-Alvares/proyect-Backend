import { Router } from 'express';
import CartDao from '../dao/cart.dao.js';

const router = Router();
const cartService = new CartDao();

router.post('/', async (req, res) => {
    try {
        const result = await cartService.create();
        res.status(201).send({ status: "success", payload: result });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
});

router.get('/:cid', async (req, res) => {
    try {
        const cart = await cartService.getById(req.params.cid);
        if (!cart) return res.status(404).send({ status: "error", message: "Cart not found" });
        res.send({ status: "success", payload: cart });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
});

router.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await cartService.getById(cid);
        cart.products = cart.products.filter(p => p.product._id.toString() !== pid);
        await cartService.update(cid, cart);
        res.send({ status: "success", message: "Product deleted" });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
});

router.put('/:cid', async (req, res) => {
    try {
        const result = await cartService.update(req.params.cid, { products: req.body.products });
        res.send({ status: "success", payload: result });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
});

export default router;