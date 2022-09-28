import { Companies } from "@prisma/client";
import { ICompany, ICompanyAuth } from "../interfaces/company.interface";
import companiesRepository from "../repositories/companiesRepository";
import bcrypt from "bcrypt";
import { ISession } from "../interfaces/sessions.interface";
import companySessionsRepository from "../repositories/companySessionsRepository";
import { v4 as uuid } from "uuid";

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

async function companyLogin(data: ICompanyAuth) {
  const company: Companies | null = await companiesRepository.findByEmail(
    data.email
  );
  if (!company) {
    throw { type: "not_found", message: "" };
  }
  if (!bcrypt.compareSync(data.password, company.password)) {
    throw { type: "unauthorized", message: "" };
  }

  const session: ISession | null = await companySessionsRepository.findByUserId(
    company.id
  );

  const token = uuid();

  session
    ? await companySessionsRepository.update({ userId: company.id, token })
    : await companySessionsRepository.insert({ userId: company.id, token });

  return { token };
}

const authServices = {
  createCompany,
  companyLogin,
};

export default authServices;
