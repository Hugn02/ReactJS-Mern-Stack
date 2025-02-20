import express from "express";
import { getBrands, addBrand, updateBrand, deleteBrand } from "../controllers/brandController.js";

const router = express.Router();

router.get("/list", getBrands);
router.post("/add", addBrand);
router.put("/update", updateBrand);
router.delete("/delete", deleteBrand);

export default router;
