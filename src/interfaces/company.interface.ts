import { Companies } from "@prisma/client";

export type ICompany = Omit<Companies, 'id'>