import { Router } from "express";
import { auth, authorize } from "../middlewares/auth.middleware.js";
import UserDTO from "../dto/user.dto.js";

const router = Router();

router.get("/", (req, res) => {

    res.send({
        status: "success",
        session: req.session
    });

});

/**
 * @swagger
 * /api/v1/session/profile:
 *   get:
 *     summary: Obtener perfil actual
 *     tags:
 *       - Session
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil obtenido correctamente
 *       401:
 *         description: No autorizado
 */

router.get("/profile", auth, (req, res) => {

    res.send({
        status: "success",
        user: req.user
    });

});

/**
 * @swagger
 * /api/v1/session/admin:
 *   get:
 *     summary: Ruta solo admin
 *     tags:
 *       - Session
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Acceso admin correcto
 *       403:
 *         description: Sin permisos
 */

router.get("/admin", auth, authorize("admin"), (req, res) => {

    res.send({
        status: "success",
        message: "Bienvenido admin"
    });

});


export default router;