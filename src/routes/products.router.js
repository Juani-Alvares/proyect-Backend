import { Router } from "express";
import { Product } from "../dao/models/product.model.js";

const router = Router();


router.get("/", async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;

    let filter = {};

    if (query) {
      if (query === "true" || query === "false") {
        filter.status = query === "true";
      } else {
        filter.category = query;
      }
    }

    let options = {
      page: parseInt(page),
      limit: parseInt(limit),
      lean: true
    };

    if (sort === "asc") {
      options.sort = { price: 1 };
    }

    if (sort === "desc") {
      options.sort = { price: -1 };
    }

    const result = await Product.paginate(filter, options);

    res.json({
      status: "success",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage
        ? `/api/products?page=${result.prevPage}`
        : null,
      nextLink: result.hasNextPage
        ? `/api/products?page=${result.nextPage}`
        : null
    });

  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});


router.get("/:pid", async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid).lean();

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(product);

  } catch (error) {
    res.status(500).json({ error: "Error al obtener el producto" });
  }
});


router.post("/", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.put("/:pid", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.pid,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(updated);

  } catch (error) {
    res.status(400).json({ error: "Error al actualizar el producto" });
  }
});


router.delete("/:pid", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.pid);

    if (!deleted) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json({ message: "Producto eliminado correctamente" });

  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
});

export default router;