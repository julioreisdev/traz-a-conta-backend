import { Router } from "express";
import {
  createRequest,
  deleteAllRequests,
  getTableRequestsById,
} from "../controllers/requestControllers";
import validateSchema from "../middlewares/validateSchema";
import { validateToken } from "../middlewares/validateToken";
import requestSchema from "../schemas/requestSchema";

const router = Router();

router.post(
  "/requests",
  validateToken,
  validateSchema(requestSchema),
  createRequest
);

router.get("/requests/:tableId", getTableRequestsById);

router.delete("/requests/:tableId", validateToken, deleteAllRequests);

export default router;
