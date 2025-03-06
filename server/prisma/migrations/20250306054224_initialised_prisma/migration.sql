-- CreateEnum
CREATE TYPE "Status" AS ENUM ('New', 'Engaged', 'ProposalSent', 'ClosedWon', 'ClosedLost');

-- CreateTable
CREATE TABLE "Leads" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Leads_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Leads_email_key" ON "Leads"("email");
