import {
  Attendants,
  AttendantSessions,
  Companies,
  CompanySessions,
} from "@prisma/client";
import attendantSessionsRepository from "../repositories/attendantSessionsRepository";
import attendantsRepository from "../repositories/attendantsRepository";
import companiesRepository from "../repositories/companiesRepository";
import companySessionsRepository from "../repositories/companySessionsRepository";

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

async function deleteAttendant(data: {
  userId: number;
  token: string;
  attendantId: number;
}) {
  const companySession: CompanySessions | null =
    await companySessionsRepository.findByToken(data.token);
  const attendant: Attendants | null = await attendantsRepository.findById(
    data.attendantId
  );
  const attendantSession: AttendantSessions | null =
    await attendantSessionsRepository.findByUserId(data.attendantId);
  if (!companySession) {
    throw { type: "unauthorized", message: "Unauthorized" };
  }
  if (!attendant) {
    throw { type: "not_found", message: "Attendant not found" };
  }
  if (attendantSession) {
    await attendantSessionsRepository.deleteByUserId(data.attendantId);
  }

  await attendantsRepository.deleteById(data.attendantId);
  return { message: "Attendant deleted successify" };
}

const attendantsServices = {
  getAttendants,
  deleteAttendant,
};

export default attendantsServices;
