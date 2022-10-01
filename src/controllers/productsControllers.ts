import { Decimal } from "@prisma/client/runtime";
import { Request, Response } from "express";
import productsServices from "../services/productsServices";

export async function createProduct(req: Request, res: Response) {
  const name: string = res.locals.body.name;
  const amount: Decimal = res.locals.body.amount;
  const userId: number = res.locals.userId;
  const token: string = res.locals.token;
  try {
    const result = await productsServices.createProduct(
      { name, amount, userId },
      token
    );
    return res.status(201).send(result);
  } catch (error: any) {
    if (error.type === "unauthorized")
      return res.status(401).send(error.message);
    if (error.type === "conflict") return res.status(409).send(error.message);
    return res.status(500).send(error);
  }
}
