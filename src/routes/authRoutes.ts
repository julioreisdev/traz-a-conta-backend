import { Router } from "express";
import {
  companyAttendantRegister,
  companyRegister,
  login,
} from "../controllers/authControllers";
import validateSchema from "../middlewares/validateSchema";
import { validateToken } from "../middlewares/validateToken";
import attendantRegisterSchema from "../schemas/attendantRegisterSchema";
import companyRegisterSchema from "../schemas/companyRegisterSchema";
import loginSchema from "../schemas/loginSchema";

const router = Router();

router.post(
  "/companies/register",
  validateSchema(companyRegisterSchema),
  companyRegister
);

router.post(
  "/companies/attendants/register",
  validateToken,
  validateSchema(attendantRegisterSchema),
  companyAttendantRegister
);

router.post("/login", validateSchema(loginSchema), login);

export default router;
