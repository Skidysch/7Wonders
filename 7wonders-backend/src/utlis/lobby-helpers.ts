import { LobbyData } from 'src/types/lobby.interface';

export const isLobbyFull = (lobby: LobbyData): boolean => {
  return lobby.players.length >= lobby.maxPlayers;
};

export const userIsInLobby = (lobby: LobbyData, userId: string): boolean => {
  return lobby.players.some((player) => player.userId === userId);
};
