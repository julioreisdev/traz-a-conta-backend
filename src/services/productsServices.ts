import { AttendantSessions, Companies, Products } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
import attendantSessionsRepository from "../repositories/attendantSessionsRepository";
import companiesRepository from "../repositories/companiesRepository";
import productsRepository from "../repositories/productsRepository";

async function createProduct(
  data: { name: string; amount: Decimal; userId: number },
  token: string
) {
  const attendant: AttendantSessions | null =
    await attendantSessionsRepository.findByToken(token);
  const company: Companies | null = await companiesRepository.findById(
    data.userId
  );

  if (attendant || !company) {
    throw { type: "unauthorized", message: "Unauthorized" };
  }

  const product: Products[] | null =
    await productsRepository.findNameAndCompanyId(data.name, company.id);

  if (product.length !== 0) {
    throw { type: "conflict", message: "Product already exist" };
  }

  await productsRepository.insert({
    name: data.name,
    amount: data.amount,
    companyId: data.userId,
  });
  return {
    message: "Product created with successify",
    data: { name: data.name, amount: data.amount, companId: data.userId },
  };
}

const productsServices = {
  createProduct,
};

export default productsServices;
