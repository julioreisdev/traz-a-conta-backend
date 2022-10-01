import { Companies, Products, Requests, Tables } from "@prisma/client";
import companiesRepository from "../repositories/companiesRepository";
import productsRepository from "../repositories/productsRepository";
import requestRepository from "../repositories/requestsRepository";
import tablesRepository from "../repositories/tablesRepository";

async function createRequest(data: Omit<Requests, "id">) {
  const product: Products | null = await productsRepository.findById(
    data.productId
  );
  const table: Tables | null = await tablesRepository.findById(data.tableId);

  if (!product) {
    throw { type: "not_found", message: "Product not found" };
  }
  if (!table) {
    throw { type: "not_found", message: "Table not found" };
  }

  const company: Companies | null = await companiesRepository.findById(
    table.companyId
  );

  if (table.companyId !== product.companyId) {
    throw {
      type: "not_found",
      message: `${product.name} not exist in to company ${company?.name}`,
    };
  }

  await requestRepository.insert(data);
  return { request: data, company: { name: company?.name, id: company?.id } };
}

const requestsServices = {
  createRequest,
};

export default requestsServices;
