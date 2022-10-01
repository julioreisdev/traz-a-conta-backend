import { Router } from "express";
import { getAttendants } from "../controllers/attendantsControllers";
import { validateToken } from "../middlewares/validateToken";

const router = Router();

router.get("/companies/attendants", validateToken, getAttendants);

export default router;
