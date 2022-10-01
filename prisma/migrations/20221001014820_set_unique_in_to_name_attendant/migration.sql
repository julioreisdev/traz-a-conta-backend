/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `attendants` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "attendants_name_key" ON "attendants"("name");
