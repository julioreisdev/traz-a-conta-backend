import connection from "../database/connection";
import { ICompany } from "../interfaces/company.interface";

async function insert(data: ICompany) {
  return await connection.companies.create({ data });
}

async function findByEmail(email: string) {
  return await connection.companies.findUnique({ where: { email } });
}

async function findById(id: number) {
  return await connection.companies.findUnique({ where: { id } });
}

const companiesRepository = {
  insert,
  findByEmail,
  findById,
};

export default companiesRepository;
