import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const PRIVATE_KEY = "CoderSecretJWT";

export const createHash = password =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) =>
    bcrypt.compareSync(password, user.password);

export const generateToken = (user) => {

    return jwt.sign(
        {
            userId: user._id,
            role: user.role,
            cart: user.cart
        },
        PRIVATE_KEY,
        {
            expiresIn: "1h"
        }
    );
};

export const verifyToken = (token) => {
    return jwt.verify(token, PRIVATE_KEY);
};