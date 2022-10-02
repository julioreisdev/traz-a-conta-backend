import { Requests } from "@prisma/client";
import connection from "../database/connection";

async function insert(data: Omit<Requests, "id">) {
  return await connection.requests.create({ data });
}

async function findAllByTableId(tableId: number) {
  return await connection.requests.findMany({ where: { 
    tableId
   } });
}

const requestRepository = {
  insert,
  findAllByTableId,
};

export default requestRepository;
