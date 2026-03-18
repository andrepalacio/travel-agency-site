/*
  Warnings:

  - You are about to drop the column `tipoInteres` on the `Lead` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Lead_email_key";

-- AlterTable
ALTER TABLE "Experience" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Lead" DROP COLUMN "tipoInteres",
ALTER COLUMN "updatedAt" DROP NOT NULL;
