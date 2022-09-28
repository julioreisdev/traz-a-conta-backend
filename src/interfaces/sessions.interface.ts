import { AttendantSessions, CompanySessions } from "@prisma/client";

export interface ISession {
    token: string
    userId: number
}