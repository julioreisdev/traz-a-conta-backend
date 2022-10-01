import { Attendants, AttendantSessions, Companies } from "@prisma/client";
import attendantSessionsRepository from "../repositories/attendantSessionsRepository";
import attendantsRepository from "../repositories/attendantsRepository";
import companiesRepository from "../repositories/companiesRepository";

async function getAttendants(data: { userId: number; token: string }) {
  const attendant: AttendantSessions | null =
    await attendantSessionsRepository.findByToken(data.token);

  const company: Companies | null = await companiesRepository.findById(
    data.userId
  );

  if (attendant || !company) {
    throw { type: "unauthorized", message: "Unauthorized" };
  }

  const attendants: Omit<Attendants, "password">[] | [] =
    await attendantsRepository.findByCompanyId(company.id);

  return { attendants };
}

const attendantsServices = {
  getAttendants,
};

export default attendantsServices;
