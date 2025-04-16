/*
  Warnings:

  - You are about to drop the `PlayerStatistics` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PlayerStatistics" DROP CONSTRAINT "PlayerStatistics_userId_fkey";

-- DropTable
DROP TABLE "PlayerStatistics";

-- CreateTable
CREATE TABLE "PlayerStatistic" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "gamesPlayed" INTEGER NOT NULL DEFAULT 0,
    "gamesWon" INTEGER NOT NULL DEFAULT 0,
    "highestScore" INTEGER NOT NULL DEFAULT 0,
    "averageScore" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "favoriteFaction" "Faction",
    "bestPlayedFaction" "Faction",
    "favoriteCard" TEXT,
    "factionPlayCounts" JSONB NOT NULL DEFAULT '{}',
    "cardUsageCounts" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "PlayerStatistic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlayerStatistic_userId_key" ON "PlayerStatistic"("userId");

-- AddForeignKey
ALTER TABLE "PlayerStatistic" ADD CONSTRAINT "PlayerStatistic_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
