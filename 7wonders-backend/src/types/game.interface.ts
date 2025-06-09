import { Faction, FactionSide } from '@prisma/client';
import { Card, CardType, Resource } from './card.interface';

export interface PlayerState {
  userId: string;
  username: string;
  faction: Faction;
  factionSide: FactionSide;
  resources: Partial<Record<Resource, number>>;
  coins: number;
  hand: Card[];
  playedCards: Card[];
  discardedCards: Card[];
  builtStages: {
    stage: number;
    cardUsed: string;
    builtAtTurn: number;
  }[];
  militaryTokens: number[];
  scienceSymbols?: {
    gear: number;
    tablet: number;
    compass: number;
  };

  // Faction-specific state
  usedFreeBuildThisAge?: boolean;
  copiedGuildCardId?: string;
  halicarnassusUsedThisTurn?: boolean;

  cardCountsByType?: Partial<Record<CardType, number>>;
}

export interface GameState {
  gameId: string;
  createdAt: number;
  status: 'IN_PROGRESS' | 'FINISHED';
  players: Record<string, PlayerState>; // userId → PlayerState
  age: 1 | 2 | 3;
  deck: Card[];
  discardPile: Card[];
  turn: number;
  submittedActions: string[]; // userIds of players who submitted actions this round
  currentPhase:
    | 'draft'
    | 'action'
    | 'resolve'
    | 'military'
    | 'endOfAge'
    | 'endGame';
  guildPool: Card[]; // выбранные гильдии для 3-й эпохи
}
