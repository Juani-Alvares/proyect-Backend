import { Router } from "express";

import {
    getAdoptions,
    getAdoptionById,
    createAdoption,
    updateAdoption,
    deleteAdoption
} from "../controllers/adoption.controller.js";

const router = Router();

router.get("/", getAdoptions);

router.get("/:id", getAdoptionById);

router.post("/", createAdoption);

router.put("/:id", updateAdoption);

router.delete("/:id", deleteAdoption);

export default router;