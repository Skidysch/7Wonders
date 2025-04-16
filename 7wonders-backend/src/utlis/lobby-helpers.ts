import { LobbyPlayer } from 'src/types/lobby-player.interface';

export const isLobbyFull = (lobby: LobbyPlayer[]) => {
  return lobby.length >= 7;
};

export const userIsInLobby = (lobby: LobbyPlayer[], userId: string) => {
  return lobby.some((player) => player.userId === userId);
};
