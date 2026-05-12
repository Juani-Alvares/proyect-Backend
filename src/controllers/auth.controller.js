import User from "../dao/models/user.model.js";
import { createHash, isValidPassword, generateToken } from "../utils/auth.js";
import CartDao from "../dao/mongo/cart.dao.js";

const cartService = new CartDao();

export const register = async (req, res) => {
    try {

        const { first_name, last_name, email, password } = req.body;

        const exists = await User.findOne({ email });

        if (exists) {
            return res.status(400).send({
                status: "error",
                message: "Usuario ya existe"
            });
        }

        const cart = await cartService.create();

        const user = await User.create({
            first_name,
            last_name,
            email,
            password: createHash(password),
            cart: cart._id
        });

        res.send({
            status: "success",
            user
        });

    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
};

export const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user || !isValidPassword(user, password)) {

            return res.status(401).send({
                status: "error",
                message: "Credenciales inválidas"
            });
        }

        const token = generateToken(user);

        res.cookie("authToken", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: false
        });

        res.send({
            status: "success",
            token
        });

    } catch (error) {

        res.status(500).send({
            status: "error",
            message: error.message
        });

    }
};