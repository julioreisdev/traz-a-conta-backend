import { Router } from "express";
import { createProduct } from "../controllers/productsControllers";
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

export default router;
