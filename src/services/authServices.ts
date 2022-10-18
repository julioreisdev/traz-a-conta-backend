import { Attendants, Companies, CompanySessions } from "@prisma/client";
import { ICompany } from "../interfaces/company.interface";
import companiesRepository from "../repositories/companiesRepository";
import bcrypt from "bcrypt";
import { ISession } from "../interfaces/sessions.interface";
import companySessionsRepository from "../repositories/companySessionsRepository";
import { v4 as uuid } from "uuid";
import { IAttendant } from "../interfaces/attendants.interface";
import attendantsRepository from "../repositories/attendantsRepository";
import attendantSessionsRepository from "../repositories/attendantSessionsRepository";
import { ILogin } from "../interfaces/login.interface";

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
    data: { user: data.email, password: data.password },
  };
}

async function companyAttendantRegister(data: IAttendant, token: string) {
  const companySession: CompanySessions | null =
    await companySessionsRepository.findByToken(token);
  if (!companySession) {
    throw { type: "unauthorized", message: "Unauthorized" };
  }

  const attendantGeneralName: Attendants | null =
    await attendantsRepository.findByName(data.name);

  const attendant: Attendants[] | [] =
    await attendantsRepository.findByNameAndCompanyId(
      data.name,
      data.companyId
    );

  if (attendant.length !== 0 || attendantGeneralName) {
    throw { type: "conflict", message: "Attendant already exist!" };
  }

  await attendantsRepository.insert(data);
  return {
    message: "Attendat created succesify!",
    data: { user: data.name, password: data.password },
  };
}

async function loginService(data: ILogin) {
  const company: Companies | null = await companiesRepository.findByEmail(
    data.user
  );
  const attendant: Attendants | null = await attendantsRepository.findByName(
    data.user
  );

  if (company) {
    if (!bcrypt.compareSync(data.password, company.password)) {
      throw { type: "unauthorized", message: "" };
    }

    const session: ISession | null =
      await companySessionsRepository.findByUserId(company.id);

    const token = uuid();

    session
      ? await companySessionsRepository.update({ userId: company.id, token })
      : await companySessionsRepository.insert({ userId: company.id, token });

    return { is_master: true, token, company: company.name };
  } else if (attendant) {
    if (data.password !== attendant.password) {
      throw { type: "unauthorized", message: "" };
    }
    const session: ISession | null =
      await attendantSessionsRepository.findByUserId(attendant.id);

    const company: Companies | null = await companiesRepository.findById(attendant.companyId)
    const token = uuid();

    session
      ? await attendantSessionsRepository.update({
          userId: attendant.id,
          token,
        })
      : await attendantSessionsRepository.insert({
          userId: attendant.id,
          token,
        });
    return { is_master: false, token, company: company?.name };
  } else {
    throw { type: "not_found", message: "User not found" };
  }
}

const authServices = {
  createCompany,
  companyAttendantRegister,
  loginService,
};

export default authServices;
