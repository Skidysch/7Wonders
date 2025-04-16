import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { GamesService } from 'src/games/games.service';
import { RedisService } from 'src/redis/redis.service';
import { LobbyPlayer } from 'src/types/lobby-player.interface';
import { getAvailableFactions, getRandomFaction, getRandomFactionSIde } from 'src/utlis/faction-helpers';
import { isLobbyFull, userIsInLobby } from 'src/utlis/lobby-helpers';

@Injectable()
export class LobbiesService {
  private readonly LOBBY_KEY = 'game_lobby';

  constructor(
    @Inject(forwardRef(() => GamesService))
    private readonly gamesService: GamesService,
    private readonly redisService: RedisService,
  ) {}

  async addPlayer(
    gameId: string,
    userId: string,
  ) {
    try {
      const players = await this.getLobbyPlayers(gameId);
      if (isLobbyFull(players)) throw new BadRequestException('Lobby is full');

      if (userIsInLobby(players, userId))
        throw new BadRequestException('User is already in lobby');

      console.log("available factions", getAvailableFactions(players));
      const faction = getRandomFaction(getAvailableFactions(players));
      const factionSide = getRandomFactionSIde();

      const playerData = JSON.stringify({
        userId,
        faction,
        factionSide,
      });

      await this.redisService
        .getClient()
        .rpush(`${this.LOBBY_KEY}:${gameId}`, playerData);
      console.log(`Player ${userId} added to lobby for game ${gameId}`);
    } catch (error) {
      console.error('Error adding player to lobby: ', error);
      throw new BadRequestException('Failed to add player to lobby');
    }
  }

  async removePlayer(gameId: string, userId: string) {
    try {
      const player = await this.getLobbyPlayer(gameId, userId);
      const playerData = JSON.stringify(player);

      await this.redisService
        .getClient()
        .lrem(`${this.LOBBY_KEY}:${gameId}`, 0, playerData);
      console.log(`Player ${userId} removed from lobby for game ${gameId}`);

      // If the lobby is empty, clear it and delete the game
      const players = await this.getLobbyPlayers(gameId);
      if (players.length === 0) {
        await this.clearLobby(gameId);
        await this.gamesService.remove(gameId);
      }
    } catch (error) {
      console.error('Error removing player from lobby:', error);
      throw new Error('Failed to remove player from lobby');
    }
  }

  async getLobbyPlayers(gameId: string): Promise<LobbyPlayer[]> {
    try {
      const players = await this.redisService
        .getClient()
        .lrange(`${this.LOBBY_KEY}:${gameId}`, 0, -1);
      return players.map((player) => JSON.parse(player) as LobbyPlayer);
    } catch (error) {
      console.error('Error getting lobby players:', error);
      throw new Error('Failed to get lobby players');
    }
  }

  async getLobbyPlayer(gameId: string, userId: string): Promise<LobbyPlayer> {
    const players = await this.getLobbyPlayers(gameId);
    const player = players.find((player) => player.userId === userId);
    if (!player)
      throw new Error(`Player ${userId} not found in lobby for game ${gameId}`);
    return player;
  }

  async startGame(gameId: string) {
    try {
      const players = await this.getLobbyPlayers(gameId);
      if (players.length < 3) throw new Error('Lobby has less than 3 players');

      await this.gamesService.updateGamePlayers(gameId, players);
      await this.gamesService.update(gameId, {
        status: 'IN_PROGRESS',
      });

      await this.clearLobby(gameId);

      console.log(`Game ${gameId} started successfully`);
      return { message: 'Game started', players };
    } catch (error) {
      console.error('Error starting game:', error);
      throw new Error('Failed to start game');
    }
  }

  async clearLobby(gameId: string) {
    try {
      await this.redisService.getClient().del(`${this.LOBBY_KEY}:${gameId}`);
      console.log(`Lobby for game ${gameId} cleared successfully`);
    } catch (error) {
      console.error('Error clearing lobby:', error);
      throw new Error('Failed to clear lobby');
    }
  }
}
