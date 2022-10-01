/*
  Warnings:

  - You are about to drop the `tables_companies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tables_companies" DROP CONSTRAINT "tables_companies_companyId_fkey";

-- DropForeignKey
ALTER TABLE "tables_companies" DROP CONSTRAINT "tables_companies_tableId_fkey";

-- DropTable
DROP TABLE "tables_companies";
