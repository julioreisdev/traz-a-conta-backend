import { Tables } from "@prisma/client";
import connection from "../database/connection";

async function findDescriptionAndCompanyId(data: Omit<Tables, "id">) {
  return await connection.tables.findMany({ where: data });
}

async function insert(data: Omit<Tables, "id">) {
  return await connection.tables.create({ data });
}

async function findById(id: number) {
  return await connection.tables.findUnique({ where: { id } });
}

const tablesRepository = {
  insert,
  findDescriptionAndCompanyId,
  findById,
};

export default tablesRepository;
