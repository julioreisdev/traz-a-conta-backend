import { Attendants } from "@prisma/client";

export type IAttendant = Omit<Attendants, 'id'>