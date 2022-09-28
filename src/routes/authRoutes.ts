import { Router } from "express";
import { companyLogin, companyRegister } from "../controllers/authControllers";
import validateSchema from "../middlewares/validateSchema";
import companyLoginSchema from "../schemas/companyLoginSchema";
import companyRegisterSchema from "../schemas/companyRegisterSchema";


const router = Router()

router.post("/companies/register", validateSchema(companyRegisterSchema), companyRegister)
router.post("/companies/login", validateSchema(companyLoginSchema), companyLogin)
router.post("/companies/attendants/register")
router.post("/companies/attendants/login")

export default router