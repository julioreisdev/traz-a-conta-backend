import { Requests } from "@prisma/client";
import { Request, Response } from "express";
import requestsServices from "../services/requestsServices";

export async function createRequest(req: Request, res: Response) {
  const data: Requests = res.locals.body;
  try {
    const result = await requestsServices.createRequest(data);
    return res.status(201).send(result);
  } catch (error: any) {
    if (error.type === "not_found") return res.status(404).send(error.message);
    return res.status(500).send(error.message);
  }
}
