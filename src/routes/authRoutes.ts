import { Router } from "express";
import { masterRegister } from "../controllers/authControllers";
import validateSchema from "../middlewares/validateSchema";
import masterSchema from "../schemas/masterSchema";

const router = Router()

router.post("/companies/register", validateSchema(masterSchema), masterRegister)
router.post("/companies/login")
router.post("/companies/attendants/register")
router.post("/companies/attendants/login")

export default router