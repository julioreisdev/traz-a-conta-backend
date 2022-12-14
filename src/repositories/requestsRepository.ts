import { Requests } from "@prisma/client";
import connection from "../database/connection";

async function insert(data: Omit<Requests, "id">) {
  return await connection.requests.create({ data });
}

async function findAllByTableId(tableId: number) {
  return await connection.requests.findMany({
    where: {
      tableId,
    },
  });
}

async function deleteByProductId(productId: number) {
  return await connection.requests.deleteMany({ where: { productId } });
}

async function deleteAllByTableId(tableId: number) {
  return await connection.requests.deleteMany({ where: { tableId } });
}

const requestRepository = {
  insert,
  findAllByTableId,
  deleteAllByTableId,
  deleteByProductId
};

export default requestRepository;
