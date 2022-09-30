import { CompanySessions } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import attendantSessionsRepository from "../repositories/attendantSessionsRepository";
import companySessionsRepository from "../repositories/companySessionsRepository";

export async function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.replace("Bearer ", "");

  const companySession: CompanySessions | null =
    await companySessionsRepository.findByToken(`${token}`);

  const attendantSession = await attendantSessionsRepository.findByToken(
    `${token}`
  );

  if (companySession) {
    res.locals.userId = companySession.userId;
    next();
  } else if (attendantSession) {
    res.locals.userId = attendantSession.userId;
    next();
  } else {
    return res.sendStatus(401);
  }
}
