import { Tables } from "@prisma/client";
import connection from "../database/connection";

async function findDescriptionAndCompanyId(data: Omit<Tables, "id">) {
  return await connection.tables.findMany({ where: data });
}

async function insert(data: Omit<Tables, "id">) {
  return await connection.tables.create({ data });
}

const tablesRepository = {
  insert,
  findDescriptionAndCompanyId,
};

export default tablesRepository;
