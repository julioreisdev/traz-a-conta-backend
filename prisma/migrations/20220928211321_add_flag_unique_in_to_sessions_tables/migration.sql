/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `attendant_sessions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[token]` on the table `company_sessions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "attendant_sessions_token_key" ON "attendant_sessions"("token");

-- CreateIndex
CREATE UNIQUE INDEX "company_sessions_token_key" ON "company_sessions"("token");
