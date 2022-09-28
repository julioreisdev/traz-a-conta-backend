import { Companies } from "@prisma/client";

export type ICompany = Omit<Companies, 'id'>

export interface ICompanyAuth {
    email: string
    password: string
}