/*
  Warnings:

  - You are about to drop the column `createdById` on the `Game` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_createdById_fkey";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "createdById",
ADD COLUMN     "hostedById" TEXT;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_hostedById_fkey" FOREIGN KEY ("hostedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
