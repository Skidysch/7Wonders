import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GameStatus, Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { LobbiesService } from 'src/lobbies/lobbies.service';
import { GameLobbyPreview, LobbyPlayer } from 'src/types/lobby.interface';

@Injectable()
export class GamesService {
  constructor(
    private readonly databaseService: DatabaseService,
    @Inject(forwardRef(() => LobbiesService))
    private readonly lobbiesService: LobbiesService,
  ) {}

  async create(createGameDto: Prisma.GameCreateInput) {
    const game = await this.databaseService.game.create({
      data: createGameDto,
    });

    // Add the host to the lobby
    await this.lobbiesService.addPlayerToLobby(game.id, game.hostedById!);

    return game;
  }

  async findAll() {
    return this.databaseService.game.findMany();
  }

  async findOne(id: string) {
    try {
      return await this.databaseService.game.findUniqueOrThrow({
        where: {
          id,
        },
        include: {
          players: true,
        },
      });
    } catch (e) {
      throw new NotFoundException('Game not found');
    }
  }

  async update(id: string, updateGameDto: Prisma.GameUpdateInput) {
    try {
      return await this.databaseService.game.update({
        where: {
          id,
        },
        data: updateGameDto,
      });
    } catch (e) {
      throw new NotFoundException('Game not found');
    }
  }

  async remove(id: string) {
    try {
      return await this.databaseService.game.delete({
        where: {
          id,
        },
      });
    } catch (e) {
      throw new NotFoundException('Game not found');
    }
  }

  async updateGamePlayers(id: string, players: LobbyPlayer[]) {
    try {
      return await this.databaseService.gamePlayer.createMany({
        data: players.map((player) => ({
          gameId: id,
          userId: player.userId,
          faction: player.faction,
          factionSide: player.factionSide,
        })),
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to update game players: ${error.message}`);
      }
      throw new Error('Failed to update game players: Unknown error');
    }
  }

  async getActiveGamesWithLobbyInfo(): Promise<GameLobbyPreview[]> {
    // Get all games with WAITING status
    const games = await this.databaseService.game.findMany({
      where: { status: GameStatus.WAITING },
      include: { hostedBy: true },
    });

    // Get lobby info for each game
    const gamesWithLobbyInfo = await Promise.all(
      games.map(async (game) => {
        const lobby = await this.lobbiesService.getLobby(game.id);
        return {
          id: game.id,
          name: game.name,
          currentPlayers: lobby ? lobby.players.length : 0,
          maxPlayers: lobby ? lobby.maxPlayers : 7,
          status: game.status,
        };
      }),
    );

    return gamesWithLobbyInfo;
  }
}
