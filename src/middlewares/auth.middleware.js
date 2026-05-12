import { verifyToken } from "../utils/auth.js";

export const auth = (req, res, next) => {

    const token = req.cookies.authToken;

    if (!token) {

        return res.status(401).send({
            status: "error",
            message: "No autorizado"
        });
    }

    try {

        const user = verifyToken(token);

        req.user = user;

        next();

    } catch (error) {

        return res.status(403).send({
            status: "error",
            message: "Token inválido"
        });
    }
};

export const authorize = (...roles) => {

    return (req, res, next) => {

        if (!roles.includes(req.user.role)) {

            return res.status(403).send({
                status: "error",
                message: "Sin permisos"
            });
        }

        next();
    };
};