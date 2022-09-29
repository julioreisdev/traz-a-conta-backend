import connection from "../database/connection";
import { IAttendant } from "../interfaces/attendants.interface";

async function insert(data: IAttendant) {
  return await connection.attendants.create({ data });
}

async function findByNameAndCompanyId(name: string, companyId: number) {
  return await connection.attendants.findMany({ where: { name, companyId } });
}

const attendantsRepository = {
  insert,
  findByNameAndCompanyId,
};

export default attendantsRepository;
