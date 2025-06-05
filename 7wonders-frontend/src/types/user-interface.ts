export interface User {
	id: string;
	username: string;
	isGuest: boolean;
	email: string;
	createdAt: string;	
	updatedAt: string;
	statistics: {
		averageScore: number;
		bestPlayedFaction: string | null;
		cardUsageCounts: Record<string, number>;
		coinsEarned: number;
		coinsSpent: number;
		factionPlayCounts: Record<string, number>;
		favoriteCard: string | null;
		favoriteFaction: string | null;
		gamesPlayed: number;
		gamesWon: number;	
		highestScore: number;
		id: string;
		totalMilitaryDefeats: number;
		totalMilitaryVictories: number;
		userId: string;
	}
}