-- CreateTable
CREATE TABLE "table" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "table_companies" (
    "id" SERIAL NOT NULL,
    "tableId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "table_companies_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "table" ADD CONSTRAINT "table_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "table_companies" ADD CONSTRAINT "table_companies_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "table_companies" ADD CONSTRAINT "table_companies_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
