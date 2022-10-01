import connection from "../database/connection";
import { IAttendant } from "../interfaces/attendants.interface";

async function insert(data: IAttendant) {
  return await connection.attendants.create({ data });
}

async function findByNameAndCompanyId(name: string, companyId: number) {
  return await connection.attendants.findMany({ where: { name, companyId } });
}

async function findByName(name: string) {
  return await connection.attendants.findUnique({ where: { name } });
}

async function findById(id: number) {
  return await connection.attendants.findUnique({ where: { id } });
}

const attendantsRepository = {
  insert,
  findByNameAndCompanyId,
  findByName,
  findById,
};

export default attendantsRepository;
