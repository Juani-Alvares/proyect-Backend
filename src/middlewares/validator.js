export const validateProduct = (req, res, next) => {
    const { title, description, price, code, stock, category } = req.body;
    if (!title || !price || !code || !stock || !category) {
        return res.status(400).send({ status: "error", message: "Incomplete fields" });
    }
    next();
};