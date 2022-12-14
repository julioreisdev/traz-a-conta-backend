import { Router } from "express";
import { createTable, deleteTable, getTables } from "../controllers/tablesControllers";
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

router.delete("/companies/tables/:tableId", validateToken, deleteTable);

export default router;
