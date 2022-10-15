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

async function deleteById(id: number) {
  return await connection.tables.delete({ where: { id } });
}

async function findByCompayId(companyId: number) {
  return await connection.tables.findMany({ where: { companyId } });
}

const tablesRepository = {
  insert,
  findDescriptionAndCompanyId,
  findById,
  findByCompayId,
  deleteById
};

export default tablesRepository;
