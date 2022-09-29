import { Request, Response } from "express";
import { IAttendant } from "../interfaces/attendants.interface";
import { ICompany, ICompanyAuth } from "../interfaces/company.interface";
import authServices from "../services/authServices";

export async function companyRegister(req: Request, res: Response) {
  const data: ICompany = res.locals.body;
  try {
    const result = await authServices.createCompany(data);
    return res.status(201).send(result);
  } catch (error: any) {
    if (error.type === "conflict") return res.status(409).send(error.message);
    return res.status(500).send(error);
  }
}

export async function companyLogin(req: Request, res: Response) {
  const data: ICompanyAuth = res.locals.body;
  try {
    const result = await authServices.companyLogin(data);
    return res.status(200).send(result);
  } catch (error: any) {
    if (error.type === "unauthorized") return res.status(401).send(error.message);
    if (error.type === "not_found") return res.status(404).send(error.message);
    return res.status(500).send(error);
  }
}


export async function companyAttendantRegister(req: Request, res: Response) {
  const data: Omit<IAttendant, 'companyId'> = res.locals.body;
  const companyId: number = res.locals.userId
  try {
    const result = await authServices.companyAttendantRegister({...data, companyId});
    return res.status(201).send(result);
  } catch (error: any) {
    if (error.type === "conflict") return res.status(409).send(error.message);
    return res.status(500).send(error);
  }
}
