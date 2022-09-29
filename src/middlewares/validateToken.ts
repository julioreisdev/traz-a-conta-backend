import { Request, Response, NextFunction } from "express";
import companySessionsRepository from "../repositories/companySessionsRepository";

export async function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const session = await companySessionsRepository.findByToken(`${token}`);
  if (!session) {
    return res.sendStatus(401);
  }
  res.locals.userId = session.userId;
  next();
}
