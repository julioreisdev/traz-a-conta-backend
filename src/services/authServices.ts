import { Attendants, Companies } from "@prisma/client";
import { ICompany, ICompanyAuth } from "../interfaces/company.interface";
import companiesRepository from "../repositories/companiesRepository";
import bcrypt from "bcrypt";
import { ISession } from "../interfaces/sessions.interface";
import companySessionsRepository from "../repositories/companySessionsRepository";
import { v4 as uuid } from "uuid";
import { IAttendant } from "../interfaces/attendants.interface";
import attendantsRepository from "../repositories/attendantsRepository";

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

async function companyAttendantRegister(data: IAttendant) {
  const attendant: Attendants[] | [] =
    await attendantsRepository.findByNameAndCompanyId(
      data.name,
      data.companyId
    );

  if (attendant.length !== 0) {
    throw { type: "conflict", message: "Attendant already exist!" };
  }

  await attendantsRepository.insert({
    ...data,
    password: bcrypt.hashSync(data.password, 10),
  });
  return { message: "Attendat created succesify!", data };
}

const authServices = {
  createCompany,
  companyLogin,
  companyAttendantRegister,
};

export default authServices;
