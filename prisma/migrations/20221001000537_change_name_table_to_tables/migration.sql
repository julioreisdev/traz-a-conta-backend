/*
  Warnings:

  - You are about to drop the `table` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `table_companies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "table" DROP CONSTRAINT "table_companyId_fkey";

-- DropForeignKey
ALTER TABLE "table_companies" DROP CONSTRAINT "table_companies_companyId_fkey";

-- DropForeignKey
ALTER TABLE "table_companies" DROP CONSTRAINT "table_companies_tableId_fkey";

-- DropTable
DROP TABLE "table";

-- DropTable
DROP TABLE "table_companies";

-- CreateTable
CREATE TABLE "tables" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "tables_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tables_companies" (
    "id" SERIAL NOT NULL,
    "tableId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "tables_companies_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tables" ADD CONSTRAINT "tables_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tables_companies" ADD CONSTRAINT "tables_companies_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "tables"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tables_companies" ADD CONSTRAINT "tables_companies_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
