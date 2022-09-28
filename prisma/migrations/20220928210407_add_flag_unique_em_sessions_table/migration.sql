/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `attendant_sessions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `company_sessions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "attendant_sessions_userId_key" ON "attendant_sessions"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "company_sessions_userId_key" ON "company_sessions"("userId");
