/*
  Warnings:

  - Added the required column `name` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `factionSide` to the `GamePlayer` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FactionSide" AS ENUM ('DAY', 'NIGHT');

-- DropForeignKey
ALTER TABLE "UserStatistic" DROP CONSTRAINT "UserStatistic_userId_fkey";

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "GamePlayer" ADD COLUMN     "factionSide" "FactionSide" NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isGuest" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "UserStatistic" ADD COLUMN     "coinsEarned" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "coinsSpent" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalMilitaryDefeats" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalMilitaryVictories" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "UserStatistic" ADD CONSTRAINT "UserStatistic_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
