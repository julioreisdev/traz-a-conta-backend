import { Companies } from "@prisma/client";
import { ICompany } from "../interfaces/company.interface";
import companiesRepository from "../repositories/companiesRepository";
import bcrypt from "bcrypt";

async function createCompany(data: ICompany) {
  const company: Companies | null = await companiesRepository.findByEmail(
    data.email
  );
  if (company)
    throw { type: "conflict", message: "Already company with this e-mail" };

  await companiesRepository.insert({
    ...data,
    password: bcrypt.hashSync(data.password, 10),
  });

  return {
    message: "Company created successify",
    data: { email: data.email, password: data.password },
  };
}

const authServices = {
  createCompany,
};

export default authServices;
