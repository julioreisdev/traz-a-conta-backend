import { Tables } from "@prisma/client";
import { Request, Response } from "express";
import tableServices from "../services/tableServices";

export async function createTable(req: Request, res: Response) {
  const description: string = res.locals.body.description;
  const userId: number = res.locals.userId;
  const token: string = res.locals.token;
  try {
    const result = await tableServices.createTable(
      { description, userId },
      token
    );
    return res.status(200).send(result);
  } catch (error: any) {
    if (error.type === "conflict") return res.status(409).send(error.message);
    if (error.type === "unauthorized")
      return res.status(401).send(error.message);
    return res.status(500).send(error);
  }
}

export async function getTables(req: Request, res: Response) {
  const userId: number = res.locals.userId;
  const token: string = res.locals.token;
  try {
    const result = await tableServices.getTables({ userId, token });
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function deleteTable(req: Request, res: Response) {
  const userId: number = res.locals.userId;
  const token: string = res.locals.token;
  const tableId: number = Number(req.params.tableId);
  try {
    const result = await tableServices.deleteTable({ userId, token, tableId });
    return res.status(200).send(result);
  } catch (error: any) {
    if (error.type === "not_found") return res.status(404).send(error.message);
    return res.status(500).send(error);
  }
}
