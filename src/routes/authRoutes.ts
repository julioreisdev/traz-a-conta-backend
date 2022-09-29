import { Router } from "express";
import {
  companyAttendantRegister,
  companyLogin,
  companyRegister,
} from "../controllers/authControllers";
import validateSchema from "../middlewares/validateSchema";
import { validateToken } from "../middlewares/validateToken";
import attendantRegisterSchema from "../schemas/attendantRegisterSchema";
import companyLoginSchema from "../schemas/companyLoginSchema";
import companyRegisterSchema from "../schemas/companyRegisterSchema";

const router = Router();

router.post(
  "/companies/register",
  validateSchema(companyRegisterSchema),
  companyRegister
);
router.post(
  "/companies/login",
  validateSchema(companyLoginSchema),
  companyLogin
);
router.post(
  "/companies/attendants/register",
  validateToken,
  validateSchema(attendantRegisterSchema),
  companyAttendantRegister
);
router.post("/companies/attendants/login");

export default router;
