import connection from "../database/connection";
import { ISession } from "../interfaces/sessions.interface";

async function insert(data: ISession) {
  return await connection.attendantSessions.create({ data });
}

async function update(data: ISession) {
  return await connection.attendantSessions.update({
    where: { userId: data.userId },
    data,
  });
}

async function findByToken(token: string) {
  return await connection.attendantSessions.findUnique({
    where: { token: token },
  });
}

async function findByUserId(userId: number) {
  return await connection.attendantSessions.findUnique({
    where: { userId: userId },
  });
}

async function deleteByUserId(userId: number) {
  return await connection.attendantSessions.delete({
    where: { userId: userId },
  });
}

const attendantSessionsRepository = {
  insert,
  update,
  findByToken,
  findByUserId,
  deleteByUserId
};

export default attendantSessionsRepository;
