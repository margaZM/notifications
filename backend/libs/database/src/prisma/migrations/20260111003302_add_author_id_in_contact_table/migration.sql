/*
  Warnings:

  - Added the required column `authorId` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "authorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
