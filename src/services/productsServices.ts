import {
  Attendants,
  AttendantSessions,
  Companies,
  Products,
} from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
import attendantSessionsRepository from "../repositories/attendantSessionsRepository";
import attendantsRepository from "../repositories/attendantsRepository";
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

async function getProducts(data: { userId: number; token: string }) {
  const attendant: AttendantSessions | null =
    await attendantSessionsRepository.findByToken(data.token);

  const company: Companies | null = await companiesRepository.findById(
    data.userId
  );

  if (attendant) {
    const allAboutAttendant: Attendants | null =
      await attendantsRepository.findById(attendant.userId);
    if (!allAboutAttendant) {
      throw { type: "not_found", message: "Not Found" };
    }
    const products: Products[] | [] =
      await productsRepository.findAllByCompanyId(allAboutAttendant.companyId);
    return { products };
  }
  if (company) {
    const products: Products[] | [] =
      await productsRepository.findAllByCompanyId(company.id);
    return { products };
  }
}

const productsServices = {
  createProduct,
  getProducts,
};

export default productsServices;
