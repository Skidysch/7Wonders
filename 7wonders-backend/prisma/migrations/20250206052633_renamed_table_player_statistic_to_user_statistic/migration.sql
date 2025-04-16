/*
  Warnings:

  - You are about to drop the `PlayerStatistic` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PlayerStatistic" DROP CONSTRAINT "PlayerStatistic_userId_fkey";

-- DropTable
DROP TABLE "PlayerStatistic";

-- CreateTable
CREATE TABLE "UserStatistic" (
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

    CONSTRAINT "UserStatistic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserStatistic_userId_key" ON "UserStatistic"("userId");

-- AddForeignKey
ALTER TABLE "UserStatistic" ADD CONSTRAINT "UserStatistic_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
