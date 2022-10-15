import { Router } from "express";
import {
  deleteAttendant,
  getAttendants,
} from "../controllers/attendantsControllers";
import { validateToken } from "../middlewares/validateToken";

const router = Router();

router.get("/companies/attendants", validateToken, getAttendants);
router.delete(
  "/companies/attendants/:attendantId",
  validateToken,
  deleteAttendant
);

export default router;
