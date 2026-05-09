-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'CONTACTED', 'QUALIFIED', 'WON', 'LOST');

-- AlterTable
ALTER TABLE "contact_submissions"
ADD COLUMN "leadStatus" "LeadStatus" NOT NULL DEFAULT 'NEW',
ADD COLUMN "source" TEXT,
ADD COLUMN "sessionId" TEXT,
ADD COLUMN "timeline" TEXT,
ADD COLUMN "selectedServices" TEXT[] DEFAULT ARRAY[]::TEXT[];
