import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GamesService } from 'src/games/games.service';
import { RedisService } from 'src/redis/redis.service';
import { LobbyData, LobbyPlayer } from 'src/types/lobby.interface';
import {
  getAvailableFactions,
  getRandomFaction,
  getRandomFactionSIde,
} from 'src/utlis/faction-helpers';
import { isLobbyFull, userIsInLobby } from 'src/utlis/lobby-helpers';

@Injectable()
export class LobbiesService {
  private readonly LOBBY_KEY = 'game_lobby';

  constructor(
    @Inject(forwardRef(() => GamesService))
    private readonly gamesService: GamesService,
    private readonly redisService: RedisService,
  ) {}

  async createLobby(
    gameId: string,
    maxPlayers: number = 7,
  ): Promise<LobbyData> {
    const lobbyData: LobbyData = {
      gameId,
      maxPlayers,
      players: [],
    };
    await this.redisService
      .getClient()
      .set(`${this.LOBBY_KEY}:${gameId}`, JSON.stringify(lobbyData));
    return lobbyData;
  }

  async getLobby(gameId: string): Promise<LobbyData | null> {
    const data = await this.redisService
      .getClient()
      .get(`${this.LOBBY_KEY}:${gameId}`);
    return data ? JSON.parse(data) : null;
  }

  async addPlayerToLobby(gameId: string, userId: string): Promise<void> {
    try {
      // Check if the game exists, if not, this line will throw an error from gamesService
      await this.gamesService.findOne(gameId);

      let lobby: LobbyData | null = await this.getLobby(gameId);
      if (!lobby) {
        lobby = await this.createLobby(gameId);
      }

      if (isLobbyFull(lobby)) {
        throw new BadRequestException('Lobby is full');
      }

      const player = await this.createLobbyPlayer(gameId, userId);

      if (userIsInLobby(lobby, userId)) {
        throw new BadRequestException('Player already in lobby');
      }

      lobby.players.push(player);
      await this.redisService
        .getClient()
        .set(`${this.LOBBY_KEY}:${gameId}`, JSON.stringify(lobby));
      console.log(`Player ${player.userId} added to lobby for game ${gameId}`);
    } catch (error) {
      console.error('Error adding player to lobby: ', error);
      throw new BadRequestException('Failed to add player to lobby');
    }
  }

  async removePlayerFromLobby(gameId: string, userId: string) {
    try {
      // Get the entire lobby data
      const lobbyData = await this.getLobby(gameId);
      if (!lobbyData) {
        throw new NotFoundException('Lobby not found');
      }

      // Find and remove the player
      const playerIndex = lobbyData.players.findIndex(
        (p) => p.userId === userId,
      );
      if (playerIndex === -1) {
        throw new NotFoundException('Player not found in lobby');
      }

      // Remove the player from the array
      lobbyData.players.splice(playerIndex, 1);

      // Update the lobby in Redis
      await this.redisService
        .getClient()
        .set(`${this.LOBBY_KEY}:${gameId}`, JSON.stringify(lobbyData));
      console.log(`Player ${userId} removed from lobby for game ${gameId}`);

      // If the lobby is empty, clear it and delete the game
      if (lobbyData.players.length === 0) {
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
      // Get the entire lobby object from Redis
      const lobbyJson = await this.redisService
        .getClient()
        .get(`${this.LOBBY_KEY}:${gameId}`);

      if (!lobbyJson) {
        return []; // Return empty array if lobby doesn't exist
      }

      // Parse the lobby JSON and extract the players array
      const lobby = JSON.parse(lobbyJson);
      return lobby.players || [];
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

  async createLobbyPlayer(
    gameId: string,
    userId: string,
  ): Promise<LobbyPlayer> {
    const lobby = await this.getLobby(gameId);
    if (!lobby) throw new NotFoundException('Lobby not found');

    const factions = getAvailableFactions(lobby);
    const faction = getRandomFaction(factions);
    const factionSide = getRandomFactionSIde();

    return {
      userId,
      faction,
      factionSide,
    };
  }

  // FIXME: Do we have to delete lobby if game is started?
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
