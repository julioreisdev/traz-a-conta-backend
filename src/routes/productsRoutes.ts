import { Router } from "express";
import { createProduct, getProducts } from "../controllers/productsControllers";
import validateSchema from "../middlewares/validateSchema";
import { validateToken } from "../middlewares/validateToken";
import productSchema from "../schemas/productSchema";

const router = Router();

router.post(
  "/companies/products",
  validateToken,
  validateSchema(productSchema),
  createProduct
);

router.get("/companies/products", validateToken, getProducts);

export default router;
