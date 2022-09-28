-- CreateTable
CREATE TABLE "company_sessions" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "company_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attendant_sessions" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "attendant_sessions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "company_sessions" ADD CONSTRAINT "company_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendant_sessions" ADD CONSTRAINT "attendant_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "attendants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
