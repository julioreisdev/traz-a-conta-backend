import { Products } from "@prisma/client";
import connection from "../database/connection";

async function findNameAndCompanyId(name: string, companyId: number) {
  return await connection.products.findMany({ where: { name, companyId } });
}

async function findById(id: number) {
  return await connection.products.findUnique({ where: { id } });
}

async function insert(data: Omit<Products, "id">) {
  return await connection.products.create({ data });
}

async function findAllByCompanyId(companyId: number) {
  return await connection.products.findMany({ where: { companyId } });
}

const productsRepository = {
  findNameAndCompanyId,
  insert,
  findById,
  findAllByCompanyId,
};

export default productsRepository;
