import { Request, Response } from "express";
import attendantsServices from "../services/attendantsServices";

export async function getAttendants(req: Request, res: Response) {
  const userId: number = res.locals.userId;
  const token: string = res.locals.token;
  try {
    const result = await attendantsServices.getAttendants({ userId, token });
    return res.status(200).send(result);
  } catch (error: any) {
    if (error.type === 'unauthorized') return res.status(401).send(error.message);
    return res.status(500).send(error);
  }
}
