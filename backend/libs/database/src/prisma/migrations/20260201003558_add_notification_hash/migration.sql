/*
  Warnings:

  - A unique constraint covering the columns `[notificationHash]` on the table `Notification` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `notificationHash` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "notificationHash" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Notification_notificationHash_key" ON "Notification"("notificationHash");
