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

async function deleteAllByTableId(tableId: number) {
  return await connection.requests.deleteMany({where: {tableId}})
}

const requestRepository = {
  insert,
  findAllByTableId,
  deleteAllByTableId
};

export default requestRepository;
