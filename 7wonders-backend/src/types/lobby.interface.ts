import { Faction, FactionSide } from './faction.enum';

export interface LobbyPlayer {
  userId: string;
  faction: Faction;
  factionSide: FactionSide;
}

export interface LobbyData {
  gameId: string;
  maxPlayers: number;
  players: LobbyPlayer[];
}

export interface GameLobbyPreview {
  id: string;
  name: string;
  hostName: string;
  currentPlayers: number;
  maxPlayers: number;
  status: string;
}
