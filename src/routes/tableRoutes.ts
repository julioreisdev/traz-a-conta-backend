import { Router } from "express";
import { createTable, getTables } from "../controllers/tablesControllers";
import validateSchema from "../middlewares/validateSchema";
import { validateToken } from "../middlewares/validateToken";
import tableSchema from "../schemas/tableSchema";

const router = Router();

router.post(
  "/companies/tables",
  validateToken,
  validateSchema(tableSchema),
  createTable
);

router.get("/companies/tables", validateToken, getTables);

export default router;
