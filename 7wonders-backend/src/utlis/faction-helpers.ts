import { BadRequestException } from '@nestjs/common';
import { Faction, FactionSide } from 'src/types/faction.enum';
import { LobbyPlayer } from 'src/types/lobby.interface';
import { LobbyData } from 'src/types/lobby.interface';

export const factionIsTaken = (lobby: LobbyPlayer[], faction: Faction) => {
  return lobby.some((player) => player.faction === faction);
};

export const getAvailableFactions = (lobby: LobbyData): Faction[] => {
  const factions = Object.values(Faction);
  const takenFactions = new Set(lobby.players.map((player) => player.faction));
  return factions.filter((faction) => !takenFactions.has(faction));
};

export const getRandomFaction = (factions: Faction[]): Faction => {
  if (factions.length === 0)
    throw new BadRequestException('No available factions');
  return factions[Math.floor(Math.random() * factions.length)];
};

export const getRandomFactionSIde = (): FactionSide => {
  const values = Object.values(FactionSide);
  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex];
};
