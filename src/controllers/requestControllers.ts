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

export async function getTableRequestsById(req: Request, res: Response) {
  const id: number = Number(req.params.tableId);
  try {
    const result = await requestsServices.findAllRequestsTables(id);
    return res.status(200).send(result);
  } catch (error: any) {
    if (error.type === "not_found") return res.status(404).send(error.message);
    return res.status(500).send(error);
  }
}


export async function deleteAllRequests(req: Request, res: Response) {
  const tableId: number = Number(req.params.tableId);
  try {
    const result = await requestsServices.deleteAllByTableId(tableId);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
}