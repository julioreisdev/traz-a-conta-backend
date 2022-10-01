import { Products } from "@prisma/client";
import connection from "../database/connection";

async function findNameAndCompanyId(name: string, companyId: number) {
  return await connection.products.findMany({ where: { name, companyId } });
}

async function insert(data: Omit<Products, "id">) {
  return await connection.products.create({ data });
}

const productsRepository = {
  findNameAndCompanyId,
  insert,
};

export default productsRepository;
