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
import requestRepository from "../repositories/requestsRepository";

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

async function deleteProduct(userId: number, token: string, productId: number) {
  const attendant: AttendantSessions | null =
    await attendantSessionsRepository.findByToken(token);
  const company: Companies | null = await companiesRepository.findById(userId);
  const product: Products | null = await productsRepository.findById(productId);

  if (attendant || !company) {
    throw { type: "unauthorized", message: "Unauthorized" };
  }
  if (!product) {
    throw { type: "not_found", message: "Product not found" };
  }

  await requestRepository.deleteByProductId(productId);
  await productsRepository.deleteById(productId);

  return {
    message: "Product deleted successify",
  };
}

const productsServices = {
  createProduct,
  getProducts,
  deleteProduct,
};

export default productsServices;
