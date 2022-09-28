import { Request, Response } from "express";
import { ICompany } from "../interfaces/company.interface";
import authServices from "../services/authServices";

export async function masterRegister(req: Request, res: Response) {
  const data: ICompany = res.locals.body;
  try {
    const result = await authServices.createCompany(data);
    return res.status(201).send(result);
  } catch (error: any) {
    if (error.type === "conflict") return res.status(409).send(error.message);
    return res.status(500).send(error);
  }
}
