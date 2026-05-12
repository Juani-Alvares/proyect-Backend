import { Router } from "express";
import passport from "passport";

import { register, login } from "../controllers/auth.controller.js";

const router = Router();

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Registrar usuario
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario registrado
 */

router.post("/register", register);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login usuario
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Login correcto
 */

router.post("/login", login);

router.post("/logout", (req, res) => {

    res.clearCookie("authToken");

    res.send({
        status: "success",
        message: "Logout realizado"
    });

});


router.get(
    "/github",
    passport.authenticate("github", {
        scope: ["user:email"]
    })
);

router.get(
    "/githubcallback",
    passport.authenticate("github", {
        session: false,
        failureRedirect: "/login"
    }),
    async (req, res) => {

        res.cookie("authToken", req.user.token, {
            httpOnly: true,
            sameSite: "lax",
            secure: false
        });

        res.send({
            status: "success",
            message: "Login con GitHub exitoso",
            user: req.user
        });

    }
);

export default router;