/*
  Warnings:

  - Changed the type of `brochureId` on the `PotentialLead` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "PotentialLead" DROP COLUMN "brochureId",
ADD COLUMN     "brochureId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Brochure" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Brochure_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Brochure_name_key" ON "Brochure"("name");
