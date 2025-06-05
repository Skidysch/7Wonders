import { GameStatus } from '@prisma/client'
import { Faction, FactionSide } from './faction.enum';

export interface LobbyPlayer {
  userId: string;
  username: string;
  faction: Faction;
  factionSide: FactionSide;
}

export interface LobbyData {
  gameId: string;
  hostId: string;
  maxPlayers: number;
  players: LobbyPlayer[];
}

export interface GameLobbyPreview {
  id: string;
  name: string;
  currentPlayers: number;
  maxPlayers: number;
  status: GameStatus;
}
