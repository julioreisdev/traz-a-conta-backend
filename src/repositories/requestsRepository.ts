import { Requests } from "@prisma/client";
import connection from "../database/connection";

async function insert(data: Omit<Requests, "id">) {
  return await connection.requests.create({ data });
}

const requestRepository = {
  insert,
};

export default requestRepository;
