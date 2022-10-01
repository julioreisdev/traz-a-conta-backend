import { Router } from "express";
import { createTable } from "../controllers/tablesControllers";
import validateSchema from "../middlewares/validateSchema";
import { validateToken } from "../middlewares/validateToken";
import tableSchema from "../schemas/tableSchema";

const router = Router();

router.post(
  "/companies/tables",
  validateSchema(tableSchema),
  validateToken,
  createTable
);

export default router;
