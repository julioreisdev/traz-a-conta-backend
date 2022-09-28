import connection from "../database/connection";
import { ISession } from "../interfaces/sessions.interface";

async function insert(data: ISession) {
  return await connection.companySessions.create({ data });
}

async function update(data: ISession) {
  return await connection.companySessions.update({
    where: { userId: data.userId },
    data,
  });
}

async function findByToken(token: string) {
  return await connection.companySessions.findUnique({
    where: { token: token },
  });
}

async function findByUserId(userId: number) {
  return await connection.companySessions.findUnique({
    where: { userId: userId },
  });
}

const companySessionsRepository = {
  insert,
  update,
  findByToken,
  findByUserId
};

export default companySessionsRepository;
