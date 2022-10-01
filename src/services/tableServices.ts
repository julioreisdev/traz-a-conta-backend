import {
  Attendants,
  AttendantSessions,
  Companies,
  CompanySessions,
  Tables,
} from "@prisma/client";
import attendantSessionsRepository from "../repositories/attendantSessionsRepository";
import attendantsRepository from "../repositories/attendantsRepository";
import companiesRepository from "../repositories/companiesRepository";
import tablesRepository from "../repositories/tablesRepository";

async function createTable(
  data: { description: string; userId: number },
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

  const table: Tables[] | null =
    await tablesRepository.findDescriptionAndCompanyId({
      description: data.description,
      companyId: company.id,
    });
  if (table.length !== 0) {
    throw { type: "conflict", message: "Table already exist!" };
  }
  await tablesRepository.insert({
    description: data.description,
    companyId: company.id,
  });
  return { data, message: "Table created with successify!" };
}

const tableServices = {
  createTable,
};

export default tableServices;
