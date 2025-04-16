import { Faction, FactionSide } from './faction.enum';

export interface LobbyPlayer {
  userId: string;
  faction: Faction;
  factionSide: FactionSide;
}
